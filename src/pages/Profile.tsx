import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Camera, Plus, MapPin, Heart, ShoppingCart, Trash2 } from "lucide-react";
import productsData from "@/data/products.json";

interface Profile {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  avatar_url: string;
}

interface Address {
  id: string;
  full_name: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_primary: boolean;
}

const Profile = () => {
  const { user, loading } = useAuth();
  const { wishlist: wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    avatar_url: "",
  });
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadAddresses();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setProfile({
          full_name: data.full_name || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const loadAddresses = async () => {
    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", user?.id)
        .order("is_primary", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user?.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrl });
      toast.success("Profile picture updated!");
    } catch (error) {
      toast.error("Error uploading avatar");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          username: profile.username,
          phone: profile.phone,
        })
        .eq("id", user?.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("Username already taken");
      } else {
        toast.error("Error updating profile");
      }
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const addressData = {
        user_id: user?.id,
        full_name: formData.get("full_name") as string,
        address_line1: formData.get("address_line1") as string,
        address_line2: formData.get("address_line2") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zip_code: formData.get("zip_code") as string,
        country: formData.get("country") as string,
        is_primary: formData.get("is_primary") === "on",
      };

      if (editingAddress) {
        const { error } = await supabase
          .from("addresses")
          .update(addressData)
          .eq("id", editingAddress.id);
        if (error) throw error;
        toast.success("Address updated!");
      } else {
        const { error } = await supabase
          .from("addresses")
          .insert([addressData]);
        if (error) throw error;
        toast.success("Address added!");
      }

      loadAddresses();
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch (error) {
      toast.error("Error saving address");
      console.error(error);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      const { error } = await supabase
        .from("addresses")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Address deleted!");
      loadAddresses();
    } catch (error) {
      toast.error("Error deleting address");
      console.error(error);
    }
  };

  const handleAddToCart = (productId: string) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart!");
  };

  const wishlistProducts = productsData.products.filter((product) =>
    wishlistItems.includes(product.id.toString())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        {/* Profile Information Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback>{profile.full_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    <Camera className="h-4 w-4" />
                    {uploading ? "Uploading..." : "Change Photo"}
                  </div>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </Label>
              </div>

              <div className="flex-1 grid gap-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={profile.email} disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <Button onClick={handleProfileUpdate} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Section */}
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Delivery Addresses</CardTitle>
            <Button onClick={() => setShowAddressForm(!showAddressForm)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </CardHeader>
          <CardContent>
            {showAddressForm && (
              <form onSubmit={handleAddressSubmit} className="mb-6 p-4 border rounded-lg">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      defaultValue={editingAddress?.full_name}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address_line1">Address Line 1</Label>
                    <Input
                      id="address_line1"
                      name="address_line1"
                      defaultValue={editingAddress?.address_line1}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address_line2">Address Line 2</Label>
                    <Input
                      id="address_line2"
                      name="address_line2"
                      defaultValue={editingAddress?.address_line2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" defaultValue={editingAddress?.city} required />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" defaultValue={editingAddress?.state} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zip_code">ZIP Code</Label>
                      <Input id="zip_code" name="zip_code" defaultValue={editingAddress?.zip_code} required />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country" defaultValue={editingAddress?.country || "United States"} required />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="is_primary"
                      name="is_primary"
                      defaultChecked={editingAddress?.is_primary}
                    />
                    <Label htmlFor="is_primary" className="cursor-pointer">Set as primary address</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Save Address</Button>
                    <Button type="button" variant="outline" onClick={() => {
                      setShowAddressForm(false);
                      setEditingAddress(null);
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="p-4 border rounded-lg flex justify-between items-start">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold">{address.full_name}</p>
                      {address.is_primary && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">
                        {address.address_line1}
                        {address.address_line2 && `, ${address.address_line2}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} {address.zip_code}
                      </p>
                      <p className="text-sm text-muted-foreground">{address.country}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingAddress(address);
                        setShowAddressForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {addresses.length === 0 && !showAddressForm && (
                <p className="text-center text-muted-foreground py-8">No addresses saved yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              My Wishlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => handleAddToCart(product.id.toString())}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromWishlist(product.id.toString())}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Your wishlist is empty</p>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
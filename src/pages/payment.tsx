import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Payment Successful!",
      description: "Your payment has been processed successfully.",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/shop");
    }, 2000);
  };

  const handleDecline = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--payment-bg))] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            {/* Credit & Debit Cards */}
            <div className="bg-[hsl(var(--payment-option-bg))] border-2 border-[hsl(var(--payment-option-border))] rounded-lg p-6 space-y-4 data-[state=checked]:border-primary">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="card" id="card" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <Label htmlFor="card" className="text-base font-semibold cursor-pointer">
                        Credit & Debit cards
                      </Label>
                      <p className="text-sm text-muted-foreground">Transaction fee may apply</p>
                    </div>
                    <div className="flex gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Maestro" className="h-6" />
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="cardholderName" className="text-sm">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          placeholder=""
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                        <div className="relative mt-1.5">
                          <Input
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="pr-12"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm">End Date</Label>
                          <div className="flex gap-2 mt-1.5">
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="mm" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                    {String(i + 1).padStart(2, "0")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="yyyy" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 15 }, (_, i) => (
                                  <SelectItem key={2024 + i} value={String(2024 + i)}>
                                    {2024 + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cvv" className="text-sm">CVV</Label>
                          <div className="relative mt-1.5">
                            <Input
                              id="cvv"
                              placeholder=""
                              maxLength={3}
                              className="pr-16"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                              3 digits
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 pt-2">
                        <Checkbox
                          id="terms"
                          checked={acceptedTerms}
                          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                          className="mt-0.5"
                        />
                        <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                          I have read and accept the terms of use,rules of flight and privacy policy
                        </Label>
                      </div>

                      <div className="space-y-2">
                        <Button
                          type="submit"
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                          disabled={!acceptedTerms}
                        >
                          Pay Now »
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={handleDecline}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Online Banking & Direct Debit */}
            <div className="bg-[hsl(var(--payment-option-bg))] border-2 border-[hsl(var(--payment-option-border))] rounded-lg p-6 data-[state=checked]:border-primary">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="banking" id="banking" />
                  <div>
                    <Label htmlFor="banking" className="text-base font-semibold cursor-pointer">
                      Online banking & Direct debit
                    </Label>
                    <p className="text-sm text-muted-foreground">Free of charge</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-600 font-bold text-xl">SOFORT</span>
                </div>
              </div>
            </div>

            {/* PayPal */}
            <div className="bg-[hsl(var(--payment-option-bg))] border-2 border-[hsl(var(--payment-option-border))] rounded-lg p-6 space-y-4 data-[state=checked]:border-primary">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <Label htmlFor="paypal" className="text-base font-semibold cursor-pointer">
                        Pay with Paypal
                      </Label>
                      <p className="text-sm text-muted-foreground">Transaction fee may apply</p>
                    </div>
                    <div>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                    </div>
                  </div>

                  {paymentMethod === "paypal" && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="paypalEmail" className="text-sm">Email</Label>
                        <Input
                          id="paypalEmail"
                          type="email"
                          placeholder=""
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="paypalPassword" className="text-sm">Password</Label>
                        <Input
                          id="paypalPassword"
                          type="password"
                          placeholder=""
                          className="mt-1.5"
                        />
                      </div>

                      <div className="space-y-2">
                        <Button
                          type="submit"
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                        >
                          Pay Now »
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={handleDecline}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </RadioGroup>
        </form>
      </div>
    </div>
  );
};

export default Payment;

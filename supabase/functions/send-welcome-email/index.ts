// ... আগের কোড...

    // আপনার কপি করা টেমপ্লেট আইডি এখানে দিন
    const WELCOME_TEMPLATE_ID = "d-4b969ae5db8b49eea20d3d8366f10cb2"; 

    // ইমেলের কন্টেন্ট তৈরি করুন (এখানে টেমপ্লেট আইডি ব্যবহার করা হচ্ছে)
    const emailData = {
      personalizations: [
        {
          to: [{ email: recipientEmail }],
          // SendGrid Template ব্যবহার করলে Subject সাধারণত দরকার হয় না,
          // কারণ Subject টেমপ্লেটের মধ্যে সেট করা থাকে।
        },
      ],
      from: { email: 'support@luxentra-shop.xyz' }, // আপনার SendGrid ভেরিফাইড ইমেল
      template_id: WELCOME_TEMPLATE_ID, // <--- নতুন পরিবর্তন!
      
      // *** ঐচ্ছিক: টেমপ্লেটে ডাইনামিক ডেটা পাস করা ***
      // যদি আপনার টেমপ্লেটে কোনো ডাইনামিক ডেটা (যেমন: ইউজারের নাম, কুপন কোড) থাকে, 
      // তাহলে সেটা এখানে 'dynamic_template_data'-এর মধ্যে পাঠাতে হবে:
      /*
      dynamic_template_data: {
        name: user.raw_user_meta_data?.full_name || "নতুন সদস্য", 
        coupon_code: "WELCOME10",
        // টেমপ্লেটে এগুলো {{name}} বা {{coupon_code}} হিসেবে ব্যবহার করা যাবে
      }
      */
    };

    // ... বাকি কোড (Fetch রিকোয়েস্ট) একই থাকবে ...
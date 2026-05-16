import { WHATSAPP_URL } from "@/lib/constants";

const whatsappButtonMessage = `
Hello Boxify, I’m interested in your Abuja and Lagos ecommerce fulfilment service.

I want to know if Boxify can help me with warehousing, customer confirmation, packaging, delivery, POD collection, reporting, and remittance for my orders.
`.trim();

const whatsappChatUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
  whatsappButtonMessage
)}`;

export const boxifyData = {
  whatsappUrl: WHATSAPP_URL,
  whatsappChatUrl,

  ctas: {
    primary: "Set Up My Fulfilment Branch",
    primaryLong: "Set Up My Abuja & Lagos Fulfilment Branch",
    secondary: "Chat With Boxify On WhatsApp",
    qualification: "Check If Boxify Can Handle My Orders",
    problem: "Stop Letting Delivery Kill The Sale",
    cost: "Fix My Fulfilment Process",
    mechanism: "Show Me How This Works For My Business",
  },
  hero: {
    eyebrow: "For Nigerian Ecommerce Vendors Selling Physical Products Into Abuja & Lagos",
    headline:
      "Turn Abuja & Lagos Into Your Local Fulfilment Zones Without Renting A Warehouse, Hiring Riders, Or Chasing Deliveries All Day.",
    subheadline:
      "Boxify helps ecommerce brands store products, confirm customers, package orders, deliver fast, collect cash-on-delivery in Abuja and Lagos, send daily reports, and remit payment — so delivery stops killing the sales you worked hard to get.",
    bullets: [
      "Store your products closer to your Abuja and Lagos customers.",
      "Let Boxify confirm orders before dispatch.",
      "Deliver faster without managing riders yourself.",
      "Collect POD payments in Abuja and Lagos without chasing customers.",
      "Get daily fulfilment reports so you know what happened with every order.",
    ],
    trustMicrocopy:
      "No rent. No staff. No rider management. Just a fulfilment system built for ecommerce sellers who want smoother delivery.",
  },

  intro: {
    headline: "The Sale Is Not Complete Until The Customer Receives The Order.",
    lines: [
      "You can run the best ad.",
      "You can have the cleanest Instagram page.",
      "You can sell a product people actually want.",
      "But if the order arrives late, damaged, or not at all, the customer does not blame the road, the rider, traffic, or logistics wahala.",
      "They blame your brand.",
      "Most ecommerce vendors are not losing customers because their product is bad. They are losing customers because the delivery experience after the sale is slow, stressful, manual, and unpredictable.",
    ],
  },

  problems: {
    headline: "Your Product Is Not The Problem. Your Delivery System Is What’s Making You Look Unserious.",
    copy:
      "A customer places an order. Then the real work begins. You confirm pickup, send details, wait for updates, call again, manage address issues, settle delivery fee arguments, and answer the customer asking, “Where is my order?”",
    cards: [
      {
        title: "Traffic kills timelines",
        body: "A simple delivery promise turns into an apology thread.",
      },
      {
        title: "Wrong addresses waste fuel",
        body: "Riders keep calling for landmarks while customers get irritated.",
      },
      {
        title: "Failed delivery drains profit",
        body: "Rejected orders still cost time, movement, and operational stress.",
      },
      {
        title: "POD gets chaotic",
        body: "Customers reject, delay, or disappear after dispatch.",
      },
      {
        title: "Manual follow-up blocks scale",
        body: "Every order still needs WhatsApp chasing and rider tracking.",
      },
      {
        title: "Your brand takes the blame",
        body: "Customers judge you by how delivery made them feel.",
      },
    ],
    closing:
      "The more orders you get, the more chaotic it becomes — unless you have a proper fulfilment system behind the business.",
  },

  costs: {
    headline: "Delivery Wahala Is Quietly Eating Your Profit.",
    subheadline:
      "The cost is not just the rider fee. The real cost is what failed delivery does to your margin, your time, your reputation, and your repeat sales.",
    items: [
      {
        title: "You lose money on failed deliveries",
        body:
          "When customers reject orders, miss calls, or are unavailable, you still pay in time, movement, rider effort, and stress.",
      },
      {
        title: "You lose repeat customers",
        body:
          "Customers remember how delivery made them feel. If the process was stressful, they may not order again.",
      },
      {
        title: "You lose control",
        body:
          "Once the package leaves your hand, you are stuck waiting for updates from riders or logistics partners.",
      },
      {
        title: "You lose scale",
        body:
          "You cannot grow properly if every order still depends on manual follow-up and rider chasing.",
      },
    ],
  },

  solution: {
    headline: "Meet Boxify: Your Abuja & Lagos Fulfilment Branch Without The Cost Of Setting Up One.",
    subheadline:
      "Boxify gives ecommerce vendors a local fulfilment system in Abuja and Lagos — so you can serve customers faster without renting space, hiring staff, managing riders, or handling every order manually.",
    body:
      "Boxify is built for ecommerce sellers who need more than “one rider that can help.” You need a system that can receive your products, store them, confirm customers, package orders, deliver, collect payment where applicable, send reports, and remit money.",
    flow: [
      "Your Store",
      "Boxify Warehouse",
      "Customer Confirmation",
      "Packaging",
      "Delivery",
      "Daily Report",
      "Remittance",
    ],
  },

  steps: [
    {
      title: "Send Your Products To Boxify",
      body:
        "Your products are stored closer to your Abuja and Lagos customers so orders can move faster when buyers confirm.",
    },
    {
      title: "Customer Order Comes In",
      body:
        "When a customer places an order, the fulfilment process begins without you manually chasing multiple people.",
    },
    {
      title: "Boxify Confirms The Customer",
      body:
        "Before dispatch, the customer can be contacted to confirm order details, address, and availability.",
    },
    {
      title: "Product Is Sorted And Packed",
      body:
        "The right product is prepared for delivery so your brand does not look careless or disorganized.",
    },
    {
      title: "Rider Delivers To The Customer",
      body:
        "The order is moved to the customer with local fulfilment support.",
    },
    {
      title: "Cash-On-Delivery Is Collected In Abuja & Lagos",
      body:
        "For Abuja and Lagos orders, Boxify can support payment collection from customers who prefer POD.",
    },
    {
      title: "You Get Daily Reports And Remittance",
      body:
        "You receive fulfilment updates, delivery outcomes, and payment remittance based on the agreed process.",
    },
  ],

  comparison: [
    {
      usual: "You store products yourself",
      boxify: "Your products can be warehoused closer to customers",
    },
    {
      usual: "You call riders manually",
      boxify: "Boxify supports the fulfilment process",
    },
    {
      usual: "You chase delivery updates",
      boxify: "You get reports on order movement",
    },
    {
      usual: "Customers give confusing addresses",
      boxify: "Customer details can be confirmed before dispatch",
    },
    {
      usual: "POD becomes stressful",
      boxify: "POD is supported in Abuja and Lagos",
    },
    {
      usual: "Failed delivery becomes your headache",
      boxify: "Returns and delivery outcomes are handled within the fulfilment flow",
    },
    {
      usual: "You look far from the customer",
      boxify: "You create a local fulfilment presence",
    },
  ],

  benefits: [
    {
      title: "You stop chasing riders all day",
      body: "Your time goes back to selling, marketing, and growing the business.",
    },
    {
      title: "Your customers get a smoother delivery experience",
      body: "Orders are handled with a clearer process, from confirmation to delivery.",
    },
    {
      title: "You can sell into Abuja and Lagos with more confidence",
      body:
        "You do not need to physically set up operations there before serving those customers better.",
    },
    {
      title: "Your brand looks more organized",
      body:
        "Customers judge your business by how smooth the order experience feels.",
    },
    {
      title: "You reduce failed delivery stress",
      body:
        "Customer confirmation and fulfilment support help reduce avoidable delivery issues.",
    },
    {
      title: "You get visibility",
      body:
        "Daily reports help you know what happened with orders, deliveries, payments, and outcomes.",
    },
    {
      title: "You make POD less chaotic",
      body:
        "For Abuja and Lagos customers, cash-on-delivery can be managed within the fulfilment process.",
    },
    {
      title: "You prepare your business to scale",
      body:
        "A manual delivery process breaks under pressure. A fulfilment system gives you room to grow.",
    },
  ],

  offerItems: [
    {
      title: "Free Warehousing Support",
      body:
        "Store your products closer to Abuja and Lagos customers without immediately renting your own warehouse.",
    },
    {
      title: "Customer Confirmation",
      body:
        "Reduce wasted dispatch by confirming customer order details, availability, and delivery information before movement.",
    },
    {
      title: "Packaging Support",
      body:
        "Prepare products properly before delivery so your customer receives the order in a presentable way.",
    },
    {
      title: "Same-City Delivery Support",
      body:
        "Serve Abuja and Lagos customers with local fulfilment and delivery support.",
    },
    {
      title: "Interstate Delivery Support",
      body:
        "Move orders outside your immediate location through available logistics routes and fulfilment support.",
    },
    {
      title: "Cash-On-Delivery Collection",
      body:
        "Support POD/cash collection for Abuja and Lagos orders.",
    },
    {
      title: "Daily Reports",
      body:
        "Get clear reports on fulfilled orders, delivery outcomes, payment status, and pending issues.",
    },
    {
      title: "Remittance",
      body:
        "Receive collected payments based on the agreed remittance schedule.",
    },
    {
      title: "Returns Support",
      body:
        "Handle returns and failed deliveries with a clearer process instead of chaotic back-and-forth.",
    },
    {
      title: "Fulfilment Guidance",
      body:
        "Get support on how to structure your order flow so delivery stops becoming the weakest part of your business.",
    },
  ],

  proof: {
    headline: "See What Ecommerce Vendors Are Saying",
    subheadline: "Real conversations. Real delivery problems. Real fulfilment support.",
    placeholders: [
      "Add WhatsApp screenshot showing orders fulfilled successfully.",
      "Add payment remittance confirmation screenshot.",
      "Add customer delivery confirmation screenshot.",
    ],
  },

  credibility: {
    headline: "Built For The Reality Of Nigerian Ecommerce Fulfilment",
    body:
      "Boxify understands that ecommerce delivery in Nigeria is not just about sending a package. It is about customer trust, confusing addresses, POD behavior, riders, traffic, failed delivery, reporting, cash collection, and making your brand look reliable even when the environment is unpredictable.",
    bullets: [
      "Abuja and Lagos fulfilment support.",
      "Ecommerce-focused order handling.",
      "Customer confirmation before dispatch.",
      "POD support where available.",
      "Daily reporting.",
      "Vendor-focused fulfilment process.",
      "Support for growing ecommerce brands.",
    ],
  },

  bonuses: [
    {
      title: "Fulfilment Readiness Check",
      body:
        "Boxify helps you understand what your current order flow needs before products start moving.",
    },
    {
      title: "Customer Confirmation Flow",
      body:
        "Get a clearer process for confirming customers before dispatch, especially for POD orders.",
    },
    {
      title: "Delivery Status Communication Guidance",
      body:
        "Know what customers should receive before, during, and after delivery so they feel informed.",
    },
    {
      title: "Inventory Intake Checklist",
      body:
        "Make sure your products are properly listed, counted, and prepared before fulfilment begins.",
    },
  ],

  risk: {
    headline: "You’ll Know The Fulfilment Process Before You Commit Your Products.",
    body:
      "Before you move your products into the Boxify fulfilment process, the team can walk you through how your orders will be handled, how reporting works, how POD applies in Abuja and Lagos, and how remittance is managed.",
    flow: [
      "Speak with Boxify",
      "Confirm fit",
      "Send inventory",
      "Start fulfilment",
      "Receive reports",
    ],
  },

  objections: [
    {
      question: "I already have riders.",
      answer:
        "That may work when orders are small. But if every order still needs manual follow-up, your business is depending on stress, not a system.",
    },
    {
      question: "I’m not based in Abuja or Lagos.",
      answer:
        "That is exactly why Boxify helps. It gives you fulfilment presence in Abuja and Lagos without setting up your own branch there.",
    },
    {
      question: "Can Boxify collect payment from customers?",
      answer:
        "Yes, cash-on-delivery support is available for Abuja and Lagos orders.",
    },
    {
      question: "Is POD available nationwide?",
      answer:
        "No. POD/cash collection should only be considered available for Abuja and Lagos unless Boxify confirms otherwise.",
    },
    {
      question: "Will I still know what is happening with my orders?",
      answer:
        "Yes. Daily reports help you track order outcomes, delivery status, and payment updates.",
    },
    {
      question: "What if customers reject the order?",
      answer:
        "Rejected or failed deliveries can be handled within the fulfilment process so you are not managing everything manually.",
    },
  ],

  faqs: [
    {
      question: "Who is Boxify for?",
      answer:
        "Boxify is for ecommerce vendors and online businesses selling physical products who need support with warehousing, customer confirmation, delivery, POD collection, reporting, and fulfilment in Abuja and Lagos.",
    },
    {
      question: "What kind of products can Boxify handle?",
      answer:
        "Boxify can support ecommerce-friendly physical products such as fashion items, beauty products, accessories, household products, packaged items, and similar products. Exact fit should be confirmed during onboarding.",
    },
    {
      question: "Does Boxify offer free warehousing?",
      answer:
        "Yes, based on the stated offer, Boxify supports vendors with free warehousing. The exact terms should be confirmed during onboarding.",
    },
    {
      question: "Does Boxify support cash-on-delivery?",
      answer:
        "Yes, for Abuja and Lagos orders.",
    },
    {
      question: "Can Boxify help if I sell from Instagram or WhatsApp?",
      answer:
        "Yes. The service is useful for sellers who receive orders from Instagram, WhatsApp, websites, marketplaces, or paid ads.",
    },
    {
      question: "How do I get reports?",
      answer:
        "Boxify provides daily reports so vendors can see order movement, delivery outcomes, payment updates, and remittance information.",
    },
    {
      question: "Can I use Boxify only for Lagos or only for Abuja?",
      answer:
        "Yes. The fulfilment setup can be discussed based on where your customers are located.",
    },
    {
      question: "What is the first step?",
      answer:
        "Click the button, fill the short form or chat on WhatsApp, and Boxify will confirm if your product type, location, and order volume fit the fulfilment process.",
    },
  ],

  finalCta: {
    headline: "Stop Letting Delivery Destroy The Trust You Worked Hard To Build.",
    body:
      "You have already done the hard part. You found the customer. You sold the product. You got the order. Now the order needs to arrive fast, safely, and professionally.",
    ps:
      "P.S. The longer your delivery process stays manual, the more every new order adds pressure to your business. Fix fulfilment now, and your next sale has a better chance of becoming a happy customer, repeat buyer, and trusted brand experience. With love Boxify💌",
  },
};
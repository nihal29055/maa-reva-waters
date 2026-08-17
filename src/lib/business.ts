// Single source of truth for the business contact details.
// Change WHATSAPP_NUMBER here and every order/chat entry point updates.
export const WHATSAPP_NUMBER = "919876543210";

export const PHONE_DISPLAY = "+91 98765 43210";
export const PHONE_TEL = "+919876543210";
export const EMAIL = "contact@maarewawater.in";
export const ADDRESS = "123 Rewa Road, Civil Lines, Jabalpur, Madhya Pradesh, 482001";
export const BUSINESS_NAME = "Maa Rewa Water Supply";

export const ORDER_MESSAGE =
  "Hi, I'd like to order water from Maa Rewa Water Supply. Please share details on pricing and delivery.";
export const SUPPORT_MESSAGE = "Hi, I have a question about your water delivery service.";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Central order handler.
 * Today: opens a pre-filled WhatsApp chat (the standard flow for local
 * delivery businesses in India).
 * Later: swap the body of this function for a real cart/checkout call
 * (e.g. Razorpay or a custom /api/orders endpoint) — every "Order Now"
 * button calls this, so it's a drop-in change, not a rewrite.
 */
export function handleOrderNow() {
  window.open(whatsappLink(ORDER_MESSAGE), "_blank", "noopener,noreferrer");
}

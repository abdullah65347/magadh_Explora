// import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers":
//         "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
// };

// interface InquiryData {
//     name: string;
//     email: string;
//     phone?: string;
//     country?: string;
//     language?: string;
//     travelerType?: string;
//     packageTier?: string;
//     destinations?: string[];
//     travelDates?: string;
//     groupSize?: number;
//     budgetRange?: string;
//     specialRequirements?: string;
// }

// const handler = async (req: Request): Promise<Response> => {
//     // Handle CORS preflight requests
//     if (req.method === "OPTIONS") {
//         return new Response(null, { headers: corsHeaders });
//     }

//     try {
//         const inquiry: InquiryData = await req.json();

//         // Validate required fields
//         if (!inquiry.name || !inquiry.email) {
//             throw new Error("Missing required fields: name and email");
//         }

//         // Check if RESEND_API_KEY is configured
//         const resendApiKey = Deno.env.get("RESEND_API_KEY");

//         if (!resendApiKey) {
//             // If no API key, log the inquiry and return success
//             // This allows the system to work without email setup
//             console.log("=== NEW INQUIRY RECEIVED ===");
//             console.log("Name:", inquiry.name);
//             console.log("Email:", inquiry.email);
//             console.log("Phone:", inquiry.phone || "Not provided");
//             console.log("Country:", inquiry.country || "Not provided");
//             console.log("Language:", inquiry.language || "en");
//             console.log("Traveler Type:", inquiry.travelerType || "Not specified");
//             console.log("Package Tier:", inquiry.packageTier || "Not specified");
//             console.log("Destinations:", inquiry.destinations?.join(", ") || "Not specified");
//             console.log("Travel Dates:", inquiry.travelDates || "Not specified");
//             console.log("Group Size:", inquiry.groupSize || "Not specified");
//             console.log("Budget Range:", inquiry.budgetRange || "Not specified");
//             console.log("Special Requirements:", inquiry.specialRequirements || "None");
//             console.log("=== END OF INQUIRY ===");

//             return new Response(
//                 JSON.stringify({
//                     success: true,
//                     message: "Inquiry logged (email notification not configured)"
//                 }),
//                 {
//                     status: 200,
//                     headers: { "Content-Type": "application/json", ...corsHeaders },
//                 }
//             );
//         }

//         // If RESEND_API_KEY is configured, send email
//         const { Resend } = await import("npm:resend@2.0.0");
//         const resend = new Resend(resendApiKey);

//         // Format the email content
//         const emailHtml = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <div style="background: linear-gradient(135deg, #d97706, #7c2d12); padding: 20px; text-align: center;">
//           <h1 style="color: white; margin: 0;">🙏 New Inquiry - Magadh Explora</h1>
//         </div>
        
//         <div style="padding: 20px; background: #fffbeb;">
//           <h2 style="color: #92400e; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
//             Contact Information
//           </h2>
//           <table style="width: 100%; border-collapse: collapse;">
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Name:</td>
//               <td style="padding: 8px 0;">${inquiry.name}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Email:</td>
//               <td style="padding: 8px 0;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Phone:</td>
//               <td style="padding: 8px 0;">${inquiry.phone || "Not provided"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Country:</td>
//               <td style="padding: 8px 0;">${inquiry.country || "Not provided"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Language:</td>
//               <td style="padding: 8px 0;">${inquiry.language || "English"}</td>
//             </tr>
//           </table>
          
//           <h2 style="color: #92400e; border-bottom: 2px solid #d97706; padding-bottom: 10px; margin-top: 20px;">
//             Trip Details
//           </h2>
//           <table style="width: 100%; border-collapse: collapse;">
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Traveler Type:</td>
//               <td style="padding: 8px 0;">${inquiry.travelerType || "Not specified"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Package Tier:</td>
//               <td style="padding: 8px 0; text-transform: capitalize;">${inquiry.packageTier || "Not specified"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Destinations:</td>
//               <td style="padding: 8px 0;">${inquiry.destinations?.join(", ") || "Not specified"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Travel Dates:</td>
//               <td style="padding: 8px 0;">${inquiry.travelDates || "Not specified"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Group Size:</td>
//               <td style="padding: 8px 0;">${inquiry.groupSize || "Not specified"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px 0; font-weight: bold; color: #78350f;">Budget Range:</td>
//               <td style="padding: 8px 0;">${inquiry.budgetRange || "Not specified"}</td>
//             </tr>
//           </table>
          
//           ${inquiry.specialRequirements ? `
//             <h2 style="color: #92400e; border-bottom: 2px solid #d97706; padding-bottom: 10px; margin-top: 20px;">
//               Special Requirements
//             </h2>
//             <p style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #d97706;">
//               ${inquiry.specialRequirements}
//             </p>
//           ` : ""}
//         </div>
        
//         <div style="background: #78350f; color: white; padding: 15px; text-align: center;">
//           <p style="margin: 0;">📞 Follow up within 24 hours to convert this lead!</p>
//           <p style="margin: 5px 0 0 0; font-size: 12px;">Magadh Explora - Travel the Legacy, Feel the Culture</p>
//         </div>
//       </div>
//     `;

//         // Send email to the admin
//         const emailResponse = await resend.emails.send({
//             from: "Magadh Explora <noreply@magadhexplora.com>", // Replace with your verified domain
//             to: ["info@magadhexplora.com"], // Replace with actual admin email
//             subject: `🎯 New Inquiry from ${inquiry.name} - ${inquiry.packageTier || "General"} Package`,
//             html: emailHtml,
//         });

//         console.log("Email sent successfully:", emailResponse);

//         return new Response(
//             JSON.stringify({ success: true, emailId: emailResponse.id }),
//             {
//                 status: 200,
//                 headers: { "Content-Type": "application/json", ...corsHeaders },
//             }
//         );
//     } catch (error: any) {
//         console.error("Error in send-inquiry-notification function:", error);
//         return new Response(
//             JSON.stringify({ error: error.message }),
//             {
//                 status: 500,
//                 headers: { "Content-Type": "application/json", ...corsHeaders },
//             }
//         );
//     }
// };

// serve(handler);

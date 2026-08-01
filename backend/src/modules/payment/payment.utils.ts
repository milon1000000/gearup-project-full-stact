// import Stripe from "stripe";
// import { prisma } from "../../lib/prisma";
// import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";

// export const handleCheckoutCompleted = async (
//    session: Stripe.Checkout.Session
// )=>{

//    const rentalOrderId=session.metadata?.rentalOrderId;

//    if(!rentalOrderId){
//       return;
//    }

//    await prisma.$transaction(async(tx)=>{

//       await tx.payment.update({
//          where:{
//             rentalOrderId
//          },
//          data:{
//             status:PaymentStatus.COMPLETED,
//             transactionId:session.payment_intent as string,
//             paidAt:new Date()
//          }
//       });

//       await tx.rentalOrder.update({
//          where:{
//             id:rentalOrderId
//          },
//          data:{
//             status:RentalStatus.PAID
//          }
//       });

//    });

// }


import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { PaymentStatus, RentalStatus } from "../../../generated/prisma/enums";

export const handleCheckoutCompleted = async (
   session: Stripe.Checkout.Session
) => {
   const rentalOrderId = session.metadata?.rentalOrderId;
   console.log("Webhook received for rentalOrderId:", rentalOrderId);

   if (!rentalOrderId) {
      console.error("Error: rentalOrderId is missing in Stripe session metadata.");
      return;
   }

   try {
      await prisma.$transaction(async (tx) => {
         await tx.payment.update({
            where: {
               rentalOrderId
            },
            data: {
               status: PaymentStatus.COMPLETED,
               transactionId: session.payment_intent as string,
               paidAt: new Date()
            }
         });

         await tx.rentalOrder.update({
            where: {
               id: rentalOrderId
            },
            data: {
               status: RentalStatus.PAID
            }
         });
      });

      console.log(`Success: Rental Order ${rentalOrderId} marked as PAID and Payment as COMPLETED.`);
   } catch (error) {
      console.error("Transaction failed inside handleCheckoutCompleted:", error);
   }
};
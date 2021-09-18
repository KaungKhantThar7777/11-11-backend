// import {
//   EntitySubscriberInterface,
//   EventSubscriber,
//   InsertEvent,
// } from 'typeorm';
// import { Patient } from '../entities/patient.entity';

// @EventSubscriber()
// export class PatientSubscriber implements EntitySubscriberInterface<Patient> {
//   /**
//    * Indicates that this subscriber only listen to Post events.
//    */
//   listenTo() {
//     return Patient;
//   }

//   /**
//    * Called before post insertion.
//    */
//   async afterInsert(event: InsertEvent<Patient>) {
//     console.log(`After Patient INSERTED: `, event.entity);

//     event.entity.token = `ESL-${event.entity.id}`;

//     await event.manager.getRepository(Patient).save(event.entity);
//   }
// }

import { NoteService } from '../services/note.service.js'

export const ActionBar = ({note}) => {
   return (
       <section>
           <div></div>
           <div></div>
           <div></div>
           <div>
               <input type="color" onChange={e => NoteService.changeColor(note.id, e.target.value)}/>
           </div>
       </section>
   ) 
}
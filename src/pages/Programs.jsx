import ProgramList from "../components/ProgramList";
export default function Programs() {
    return (
        <div className="container mx-auto p-8 w-5/6">
             <div className="flex justify-between items-center mb-4">
               <h1 className="text-secondary text-2xl font-bold mb-6">
                 Program Management
               </h1>
               <a href="/programs/add" className="btn">
                 Add New Program
               </a>
             </div>
             <div className="bg-white p-6 rounded-lg shadow-md">
                <ProgramList />
             </div>
           </div>
    );
    }
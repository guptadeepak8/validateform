import Docs from "./Docs";
import Form from "./Form";


export default function FormPage() {
  return (
    <div className="flex h-screen">
      
      {/* LEFT — DOCS */}
      <div className="w-1/2 border-r p-8 overflow-y-auto">
       <Docs/>
      </div>

      {/* RIGHT — FORM */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <Form />
      </div>

    </div>
  );
}

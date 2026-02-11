import Docs from "../component/Docs";
import Form from "../component/Form";


async function fetchRules() {
  const res = await fetch("http://localhost:8080/rules", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load rules");
  }

  return res.json();
}

export default async function FormPage() {
  const data = await fetchRules();
  const rules = data.rules;

  return (
    <div className="flex h-screen">

      {/* LEFT */}
      <div className="w-1/2 border-r p-8 overflow-y-auto">
        <Docs />
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex  p-8">
        <Form rules={rules}/>
      </div>

    </div>
  );
}

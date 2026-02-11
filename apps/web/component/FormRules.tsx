import { DynamicRule } from "@repo/types";

const FormRules = ({ rules }: { rules: DynamicRule[] }) => {
  return (
    <div className="rounded-xl border bg-gray-50 p-5">
      
      <h2 className="text-lg font-semibold mb-3">
        Active Validation Rules
      </h2>

      <p className="text-lg text-gray-500 mb-4">
        These rules are fetched from the server and used to dynamically build the validation schema.
      </p>

      <pre className="bg-black text-white text-sm p-4 rounded-lg overflow-x-auto">
        <code>
          {JSON.stringify(rules, null, 2)}
        </code>
      </pre>

    </div>
  );
};

export default FormRules;

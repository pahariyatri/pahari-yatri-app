type Props = {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
};

export default function IdentityStep({ formData, updateFormData, onNext }: Props) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Who are you?</h2>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => updateFormData("firstName", e.target.value)}
        className="w-full rounded-md p-2 bg-transparent border border-gray-300"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => updateFormData("lastName", e.target.value)}
        className="w-full rounded-md p-2 bg-transparent border border-gray-300"
      />
      <button
        onClick={onNext}
        className="px-4 py-2 bg-himalayan-green-700 text-white rounded-lg"
      >
        Continue
      </button>
    </div>
  );
}

function FormInput({ name, label, type }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-medium">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      />
    </div>
  );
}

export default FormInput;

function FormTextArea({ label, name, placeholder, rows = 3, required }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-colors"
      ></textarea>
    </div>
  );
}

export default FormTextArea;

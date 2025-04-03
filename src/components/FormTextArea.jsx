function FormTextArea({ label, name }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium">{label}</label>
      <textarea
        className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 bg-white text-black"
        placeholder="Type here"
        name={name}
      ></textarea>
    </div>
  );
}

export default FormTextArea;

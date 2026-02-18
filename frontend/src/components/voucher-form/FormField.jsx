export default function FormField({ label, name, type = 'text', children, required, errors }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {errors[name] && (
        <p className="text-xs text-red-600 mt-0.5">{errors[name]}</p>
      )}
    </div>
  )
}
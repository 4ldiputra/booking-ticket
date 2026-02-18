export function validateForm(form) {
  const errs = {}

  if (!form.crewName.trim()) {
    errs.crewName = 'Crew name is required.'
  }

  if (!form.crewId.trim()) {
    errs.crewId = 'Crew ID is required.'
  }

  if (!form.flightNumber.trim()) {
    errs.flightNumber = 'Flight number is required.'
  }

  if (!form.flightDate) {
    errs.flightDate = 'Flight date is required.'
  }

  if (!form.aircraft) {
    errs.aircraft = 'Please select an aircraft type.'
  }

  return errs
}
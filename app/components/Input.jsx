import React from 'react'

const Input = () => {
  return (
    <div>
        <div class="relative flex items-center w-full">
  <input
    type="text"
    placeholder="Écrivez ici..."
    class="w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
  />
  <select
    onchange="this.previousElementSibling.value = this.value"
    class="rounded-r-md border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm p-2 border focus:ring-indigo-500 focus:border-indigo-500"
  >
    <option value="" selected disabled>Options</option>
    <option value="Option 1">Option 1</option>
    <option value="Option 2">Option 2</option>
    <option value="Option 3">Option 3</option>
  </select>
</div>
    </div>
  )
}

export default Input
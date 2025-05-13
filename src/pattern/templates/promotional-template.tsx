import type React from "react"
import type { Template } from "@/types/template"

interface PromotionalTemplateProps {
  template: Template
}

export const PromotionalTemplate: React.FC<PromotionalTemplateProps> = ({ template }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 border border-gray-200 rounded-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">{template.name}</h2>
        <p className="text-gray-600">Special promotional offer</p>
      </div>

      <div className="bg-blue-50 p-6 rounded-md mb-6 text-center">
        <h3 className="text-2xl font-bold text-blue-800 mb-2">Limited Time Offer!</h3>
        <p className="text-blue-600 mb-4">
          Use code <span className="font-bold">SPECIAL20</span> for 20% off your next purchase
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">Shop Now</button>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Featured Products</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 p-3 rounded-md">
            <div className="bg-gray-100 h-32 mb-2 rounded-md"></div>
            <h5 className="font-medium">Product 1</h5>
            <p className="text-gray-700 text-sm">Brief description of product 1.</p>
          </div>
          <div className="border border-gray-200 p-3 rounded-md">
            <div className="bg-gray-100 h-32 mb-2 rounded-md"></div>
            <h5 className="font-medium">Product 2</h5>
            <p className="text-gray-700 text-sm">Brief description of product 2.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 text-center">
        <p className="text-sm text-gray-500">Created: {new Date(template.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  )
}

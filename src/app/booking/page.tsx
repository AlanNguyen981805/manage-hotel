"use client";

export default function Booking() {
  return (
    <div className="w-full h-full">
      <div className="container mx-auto flex gap-8 py-8">
        <div className="w-[70%]">
          {/* Left content block */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col gap-6">
              {/* Days Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Booking Details</h3>

                {/* Day 1 */}
                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium text-lg mb-3">Day 1</h4>

                  {/* Hotel Info */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-700 mb-2">Hotel</h5>
                    <div className="flex flex-col gap-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hotel Name:</span>
                        <span>Grand Hotel</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room Quantity:</span>
                        <span>2 Rooms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Beds:</span>
                        <span>1 Bed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span>$150/night</span>
                      </div>
                    </div>
                  </div>

                  {/* Transportation Info */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-700 mb-2">
                      Transportation
                    </h5>
                    <div className="flex flex-col gap-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span>Private Car</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span>1 Vehicle</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span>$50</span>
                      </div>
                    </div>
                  </div>

                  {/* Services Info */}
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Services</h5>
                    <div className="flex flex-col gap-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span>Spa Service</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Request:</span>
                        <span>2 Hours Session</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span>$75</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="border-b pb-4 mb-4">
                  <h4 className="font-medium text-lg mb-3">Day 2</h4>

                  {/* Hotel Info */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-700 mb-2">Hotel</h5>
                    <div className="flex flex-col gap-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hotel Name:</span>
                        <span>Luxury Resort</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room Quantity:</span>
                        <span>1 Room</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Additional Beds:</span>
                        <span>None</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span>$200/night</span>
                      </div>
                    </div>
                  </div>

                  {/* Transportation Info */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-700 mb-2">
                      Transportation
                    </h5>
                    <div className="flex flex-col gap-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span>Shuttle Bus</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span>2 Seats</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span>$25</span>
                      </div>
                    </div>
                  </div>

                  {/* Services Info */}
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Services</h5>
                    <div className="flex flex-col gap-2 pl-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span>Guided Tour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Request:</span>
                        <span>Full Day Tour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span>$100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[30%]">
          {/* Right content block */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-semibold">Price Summary</h3>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Rate (3 nights)</span>
                  <span>$450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Charges</span>
                  <span>$150</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span>$60</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>$660</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <p>• Full payment will be charged at check-in</p>
                <p>• Rates are subject to change without prior notice</p>
                <p>• All charges are in USD</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  // Create content for Word document
                  const content = `
                    Booking Details
                    
                    Room Rate (3 nights): $450
                    Service Charges: $150 
                    Taxes & Fees: $60
                    Total: $660
                    
                    Additional Information:
                    - Free WiFi available throughout the property
                    - Check-in time: 2:00 PM
                    - Check-out time: 12:00 PM
                    - Free cancellation until 24 hours before check-in
                  `;

                  // Create blob and download
                  const blob = new Blob([content], {
                    type: "application/msword",
                  });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "booking-details.doc";
                  link.click();
                  window.URL.revokeObjectURL(url);
                }}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition"
              >
                Download Booking Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

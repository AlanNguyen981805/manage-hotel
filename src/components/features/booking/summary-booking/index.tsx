"use client";

export const SummaryBooking = () => {
  return (
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
          className="w-full bg-accent text-black/80 py-3 rounded-lg hover:bg-accent/90 transition"
        >
          Download Booking Details
        </button>
      </div>
    </div>
  );
}

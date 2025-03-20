"use client";

import { IFormSearchResult } from "@/components/features/home/result-search-booking/defination";
import { Price } from "@/components/ui/price";
import { useTranslation } from "@/hooks/useTranslation";
import { generateWordDocument } from "./booking-info-doc";

interface SummaryBookingProps {
  resultSearchBooking: IFormSearchResult;
}

export const SummaryBooking = ({
  resultSearchBooking,
}: SummaryBookingProps) => {
  const { t } = useTranslation();

  const calculateTotals = () => {
    let hotelTotal = 0;
    let transportationTotal = 0;
    let servicesTotal = 0;
    let additionalCostsTotal = 0;

    Object.values(resultSearchBooking).forEach((dayBooking) => {
      // Sum hotels
      dayBooking.hotels?.forEach((hotel) => {
        hotelTotal += hotel.price;
      });

      // Sum transportation
      dayBooking.transportation?.forEach((transport) => {
        transportationTotal += transport.price;
      });

      // Sum services
      dayBooking.services?.forEach((service) => {
        servicesTotal += service.price;
      });

      // Sum additional costs
      dayBooking.additionalCosts?.forEach((cost) => {
        additionalCostsTotal += cost.price;
      });
    });

    const total =
      hotelTotal + transportationTotal + servicesTotal + additionalCostsTotal;

    return {
      hotelTotal,
      transportationTotal,
      servicesTotal,
      additionalCostsTotal,
      total,
    };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold">{t("summary.title")}</h3>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-gray-600">{t("summary.hotel")}</span>
            <Price value={totals.hotelTotal} label="" />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("summary.transportation")}</span>
            <Price value={totals.transportationTotal} label="" />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("summary.service")}</span>
            <Price value={totals.servicesTotal} label="" />
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("summary.additional")}</span>
            <Price value={totals.additionalCostsTotal} label="" />
          </div>
          <div className="flex justify-between font-semibold text-lg pt-3 border-t">
            <span>{t("summary.total")}</span>
            <Price value={totals.total} label="" size="lg" />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <p>{t("summary.paymentNotice1")}</p>
          <p>{t("summary.paymentNotice2")}</p>
          <p>{t("summary.paymentNotice3")}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            // Create content for Word document
            const content = `
                    Booking Details
                    
                    Hotel: $${totals.hotelTotal}
                    Transportation: $${totals.transportationTotal}
                    Service: $${totals.servicesTotal}
                    Additional: $${totals.additionalCostsTotal}
                    Total: $${totals.total}
                    
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
        <button onClick={generateWordDocument}>Tạo file Word</button>
      </div>
    </div>
  );
};

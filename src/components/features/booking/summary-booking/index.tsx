"use client";

import { IFormSearchResult } from "@/components/features/home/result-search-booking/defination";
import { Price } from "@/components/ui/price";
import { useTranslation } from "@/hooks/useTranslation";
import { generateWordDocument } from "./booking-info-doc";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api/client";
import { HistoryData } from "../../home/history-booking";
import { API_ENDPOINTS } from "@/lib/api/config";
import useUserStore from "@/store/useUserStore";

interface VendorInfo {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  company?: string;
}

interface SummaryBookingProps {
  resultSearchBooking: IFormSearchResult;
  vendor: VendorInfo;
  dateCheckIn: Date | null;
  dateCheckOut: Date | null;
  numberOfPeople: number;
  numberOfDays: number;
}

export const SummaryBooking = ({
  resultSearchBooking,
  vendor,
  dateCheckIn,
  dateCheckOut,
  numberOfPeople,
  numberOfDays,
}: SummaryBookingProps) => {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const [lastestHistory, setLastestHistory] = useState<HistoryData | null>(
    null
  );

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
      hotelTotal: hotelTotal,
      transportationTotal: transportationTotal,
      servicesTotal: servicesTotal,
      additionalCostsTotal,
      total,
    };
  };

  const totals = calculateTotals();

  useEffect(() => {
    if (!lastestHistory) {
      const fetchLatestHistory = async () => {
        try {
          // Get only the latest record by sorting descending and limiting to 1
          const queryParams = `?filters[users_permissions_user][company][id][$eq]=${user?.company?.id}&populate=users_permissions_user.company&sort=createdAt:desc&pagination[pageSize]=1&pagination[page]=1`;

          const response = await apiClient.get<{ data: HistoryData[] }>(
            `${API_ENDPOINTS.HISTORIES}${queryParams}`
          );

          setLastestHistory(response.data.data?.[0] || null);
        } catch (error) {
          console.error("Error fetching latest history:", error);
        }
      };

      fetchLatestHistory();
    }
  }, []);
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold">{t("summary.title")}</h3>

        {vendor && (
          <div className="p-4 border rounded-lg space-y-2 bg-gray-50">
            <h4 className="font-medium">Vendor Information</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Name:</span> {vendor.name}
              </p>
              {vendor.address && (
                <p>
                  <span className="font-medium">Address:</span> {vendor.address}
                </p>
              )}
              {vendor.phone && (
                <p>
                  <span className="font-medium">Phone:</span> {vendor.phone}
                </p>
              )}
              {vendor.email && (
                <p>
                  <span className="font-medium">Email:</span> {vendor.email}
                </p>
              )}
              {vendor.company && (
                <p>
                  <span className="font-medium">Company:</span> {vendor.company}
                </p>
              )}
            </div>
          </div>
        )}

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

        <div>
          <button
            className="w-full bg-accent text-black/80 py-3 rounded-lg hover:bg-accent/90 transition"
            onClick={() =>
              generateWordDocument(
                vendor,
                dateCheckIn,
                dateCheckOut,
                resultSearchBooking,
                numberOfPeople,
                totals,
                numberOfDays,
                lastestHistory
              )
            }
          >
            Download Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

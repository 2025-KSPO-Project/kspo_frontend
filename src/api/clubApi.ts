import { getJSON } from "@/api/axios"; 
import { ClubListResponse } from "@/types/clubs";

export const fetchClubs = async (page: number, size: number): Promise<ClubListResponse> => {
    const url = `/clubs/list/local`;
    
    const res = await getJSON<ClubListResponse>(url, { page, size });

    // API 응답 구조 검증
    if (!res.success || !res.data || !Array.isArray(res.data.content)) {
        throw new Error(res.error?.message || "Failed to fetch club data.");
    }
    
    return res as ClubListResponse;
};
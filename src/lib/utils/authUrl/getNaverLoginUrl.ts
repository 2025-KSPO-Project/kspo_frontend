import { env } from "@/lib/utils/env";

/**
 * 네이버 소셜 로그인을 시작하기 위한 백엔드 인증 URL을 구성합니다.
 * @returns {string} 완성된 리디렉션 URL
 */
export const getNaverLoginUrl = (): string => {
    // env.API_BASE_URL (예: http://localhost:8080)을 사용합니다.
    const baseUrl = env.API_BASE_URL; 
    
    // 백엔드 개발자가 지정한 OAuth2 인증 시작 경로를 붙입니다.
    // 'ouath2' 오타가 자주 발생하므로 주의해야 합니다. (oauth2로 가정)
    const oauthPath = "/oauth2/authorization/naver"; 
    
    return `${baseUrl}${oauthPath}`;
};
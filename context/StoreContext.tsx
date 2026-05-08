"use client"
import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
interface Question {
    id : number;
    question : string;
}
interface ReviewSpace {
    header?: string;
    message?: string;
    Question?: Question[];
}

interface StoreContextType {
    URL: string;
    addSpace: (prop: any) => Promise<void>;
    getSpace: () => Promise<void>;
    getReviewSpace: (prop: any) => Promise<void>;
    reviewSpace: ReviewSpace;
    link: string;
    spaces: any[];
    video: string;
    setuserId: (id: string) => void;
    userId: string;
    addReview: (prop: any) => Promise<void>;
    getReview: (prop: any) => Promise<void>;
    addGpt: (prop: any) => Promise<void>;
    analyzeReviews: (reviews: any[]) => Promise<any>;
    generateReply: (customerName: string, reviewContent: string) => Promise<string>;
    generateEmbedTheme: (prompt: string) => Promise<any>;
    toggleFavourite: (reviewId: string, favourite: boolean) => Promise<void>;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

const StoreContextProvider = (props:any) => {

    const URL = process.env.NEXT_PUBLIC_URL || "";
    const [userId, setuserId] = useState('');
    const [spaces, setSpaces] = useState<any[]>([]);
    const [link, setlink] = useState<string>("");
    const [reviewSpace, setReviewSpace] = useState<ReviewSpace>({});
    const [video, setVideo] = useState('');

    const getReviewSpace = async(prop:any)=>{
        const response = await axios.post(`${URL}/api/testimonial`,prop);

        const data = response.data.data[0];
        const questions = Array.isArray(data.Question) ? data.Question : [];

        setReviewSpace({
            ...data,
            Question: questions
        });
    }

    const getSpace = async ()=>{
        const response = await axios.get(`${URL}/api/space`,{headers:{userId:userId}});
        setSpaces(response.data.data);
    }

    const addSpace = async (prop:any) => {
        console.log(prop);
        try {

          const response = await axios.post(`${URL}/api/space`,prop);
            setlink(response.data.data.id);
          
        } catch (e) {

          console.error('Error submitting form:', e);
        }
    
    };

    const addReview = async (prop:any) => {
        try {
          const response = await axios.post(`${URL}/api/review`,prop);
        setlink(response.data.data.id);
          
        } catch (e) {

          console.error('Error submitting form:', e);
        }
    
    };

    const getReview = async (prop:any) => {
        try {
            const response = await axios.get(`${URL}/api/review`, {
                headers: { spaceId: prop }
            });
            
            return response.data.data;

        } catch (error) {

            console.error('Error fetching reviews:', error);

        }
    }

    const updateReview = async (prop:any) => {
        try {
            
            


        } catch (error) {
            
        }
    }
    
    const addGpt = async (prop:any) => {
        try {
            const response = await axios.post(`${URL}/api/genai`,{
                "name": prop
            });
            if (!response.data.data) {
                throw new Error("Invalid response from AI service");
            }
            return response.data.data;
        } catch (error: any) {
            console.error("AI Generation Error:", error);
            throw new Error(error?.response?.data?.message || error?.message || "Failed to generate space with AI");
        }
    }

    const analyzeReviews = async (reviews: any[]) => {
        try {
            const response = await axios.post(`${URL}/api/analyze-reviews`, {
                reviews: reviews
            });
            if (!response.data.data) {
                throw new Error("Invalid response from AI analysis service");
            }
            return response.data.data;
        } catch (error: any) {
            console.error("AI Analysis Error:", error);
            throw new Error(error?.response?.data?.message || error?.message || "Failed to analyze reviews");
        }
    }
    
    const generateReply = async (customerName: string, reviewContent: string) => {
        try {
            const response = await axios.post(`${URL}/api/generate-reply`, {
                customerName,
                reviewContent
            });
            if (!response.data.data?.reply) {
                throw new Error("Invalid response from AI reply service");
            }
            return response.data.data.reply;
        } catch (error: any) {
            console.error("AI Reply Generation Error:", error);
            throw new Error(error?.response?.data?.message || error?.message || "Failed to generate reply");
        }
    }
    
    const generateEmbedTheme = async (prompt: string) => {
        try {
            const response = await axios.post(`${URL}/api/generate-embed-theme`, {
                prompt
            });
            if (!response.data.data) {
                throw new Error("Invalid response from AI theme generator");
            }
            return response.data.data;
        } catch (error: any) {
            console.error("AI Theme Generation Error:", error);
            throw new Error(error?.response?.data?.message || error?.message || "Failed to generate theme");
        }
    }
    
    const toggleFavourite = async (reviewId: string, favourite: boolean) => {
        try {
            await axios.patch(`${URL}/api/review/favourite`, {
                reviewId,
                favourite
            });
        } catch (error: any) {
            console.error("Error toggling favourite status:", error);
            throw new Error(error?.response?.data?.message || error?.message || "Failed to update review");
        }
    }
    

    

    const contextVlaue : StoreContextType = {
        URL,
        addSpace,
        getSpace,
        getReviewSpace,
        link,
        spaces,
        video,
        setuserId,
        userId,
        addReview,
        getReview,
        reviewSpace,
        addGpt,
        analyzeReviews,
        generateReply,
        generateEmbedTheme,
        toggleFavourite,
    }

    return (
        <StoreContext.Provider value={contextVlaue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

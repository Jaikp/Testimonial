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
    }

    return (
        <StoreContext.Provider value={contextVlaue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

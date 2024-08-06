"use client"
import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
export const StoreContext = createContext({})

const StoreContextProvider = (props:any) => {

    const url = 'http://localhost:3000/api/space';
    const [userId, setuserId] = useState('');
    const [spaces, setSpaces] = useState<any[]>([]);
    const [link, setlink] = useState<string>("");
    const [reviewSpace, setReviewSpace] = useState([]);
    const [video, setVideo] = useState('')
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        async function loadData(){
             
            await getSpace();
        }
        loadData();
    },[userId])


    const getReviewSpace = async(prop:any)=>{
        const response = await axios.post('http://localhost:3000/api/testimonial',prop);
      
        setReviewSpace(response.data.data[0]);
      
    }

    const getSpace = async ()=>{
        const response = await axios.get(url,{headers:{userId:userId}});
        setSpaces(response.data.data);
        console.log(response.data.data);
    }

    const addSpace = async (prop:any) => {
        console.log(prop);
        try {

          const response = await axios.post(url,prop);
    
            setlink(response.data.data.id);
          
        } catch (e) {

          console.error('Error submitting form:', e);
        }
    
    };
    const addReview = async (prop:any) => {
        console.log(prop);
        try {
          const response = await axios.post('http://localhost:3000/api/review',prop);
        setlink(response.data.data.id);
          
        } catch (e) {

          console.error('Error submitting form:', e);
        }
    
    };
    const getReview = async (prop:any) => {
        try {
            const response = await axios.get('http://localhost:3000/api/review', {
                headers: { spaceId: prop }
            });
            console.log(response.data.data);
            setReviews(response.data.data);

        } catch (error) {

            console.error('Error fetching reviews:', error);

        }
    }
    

    const getendpoint = async()=> {

                const muxTokenId = process.env.MUX_TOKEN_ID;
                const muxTokenSecret = process.env.MUX_TOKEN_SECRET;

                const auth = Buffer.from(`4ebb6f4a-55be-487a-8851-389f5b40828c:hLbb2txAORBP8FYECMPWEL81C+7+a4opWqx8dCFtgE0TGk0+A8jzezFwDIFVG/AxrUvjClb5ICB`).toString('base64');

                try {
                    const response = await axios.post(
                        'https://api.mux.com/video/v1/uploads',
                        {
                        cors_origin: '*',
                        new_asset_settings: {
                            playback_policy: ['public'],
                            encoding_tier: 'baseline',
                        },
                        },
                        {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Basic ${auth}`,
                        },
                        }
                    );
                    const end = response.data.data.url;
                    setVideo(end);
                } catch (error) {
                    console.log(error);
                }
    }


    

    const contextVlaue = {
        url,
        addSpace,
        getSpace,
        getReviewSpace,
        reviewSpace,
        link,
        spaces,
        getendpoint,
        video,
        setuserId,
        userId,
        addReview,
        getReview,
        reviews
    }

    return (
        <StoreContext.Provider value={contextVlaue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider

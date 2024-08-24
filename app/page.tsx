import Navbar from "@/components/Navbar/Navbar";
import MuxPlayer from "@mux/mux-player-react"; 

export default function Home() {
  return (
        <>
            <Navbar/>
            <div className="w-1/2 m-auto mt-16">
              <MuxPlayer
                  playbackId="zw5QawgAwbOzIayMBL8GBH00kcu6GbmksYggXeEfE02I4"
                  metadata={{
                    video_id: "video-id-54321",
                    video_title: "Test video title",
                    viewer_user_id: "user-id-007",
                  }}
              />
            </div>
        </>
  );
}

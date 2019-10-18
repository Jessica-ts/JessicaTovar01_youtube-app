let my_link = "https://www.googleapis.com/youtube/v3/search?";
let API_key= "AIzaSyBSn9hm5ZdD5lACnRXnx-QmHCuPC8LNZA0";
let Next_Page="";
let Prev_Page=""; 

function Search_Videos()
{
    
       $("#Search_btn").on("click", function(event) {
        event.preventDefault();
        let input= $("#inp_video").val();
        $.ajax(
        {
            url: my_link,
            data:
            {
                part: "snippet",
                maxResults: 10, 
                q: input,
                type: "video",
                key: API_key
            },
            method: 'GET',
            dataType: 'json',
            success : function(responseJSON) 
            {
                $("#Result_Videos").empty();
                Next_Page = responseJSON.nextPageToken;
                Prev_Page = responseJSON.prevPageToken;
                let counter=0;
                for (let video of responseJSON.items) 
                {
                    console.log(video);
                    $("#Result_Videos").append("<div class='video'><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'><h2 class='link'>" + video.snippet.title + "</h3><img class='link' src='" + video.snippet.thumbnails.medium.url + "'/></a></div>");
                    counter=counter+1;
                    $("#Result_Videos").css("border", "3px solid rgb(202,202,202)");
                    $(".video").css("border-bottom", "2.5px dotted rgb(202,202,202)");
                }
                

                if (Prev_Page === undefined) 
                    $("#Prev_btn").css("display", "none" );
            
                
                else 
                    $("#Prev_btn").css("display", "inline");
                    
    
                if (Next_Page === undefined)
                    $("#Next_btn").css("display", "none" );
            
                else 
                    $("#Next_btn").css("display", "inline");    

            },

            error: function(err) 
            {
                 $("#Result_Videos").html('<div><p>Something went wrong.</p></div>');
            }

        });
        
});
       
}

function PreviousPage()
{
     $("#Prev_btn").on("click", function(event) {
        event.preventDefault();
        let input= $("#inp_video").val();   
        $.ajax(
        {
            url: my_link,
            data: 
            {
                part: "snippet", 
                maxResults: 10, 
                q: input, 
                pageToken: Prev_Page, 
                type: "video", 
                key: API_key 
            },
            method: 'GET',
            dataType: 'json',

        success: function(responseJSON) 
        {
            $("#Result_Videos").empty();
            Next_Page = responseJSON.nextPageToken;
            Prev_Page = responseJSON.prevPageToken;
            
            for (let video of responseJSON.items) 
            {
                $("#Result_Videos").append("<div class='video'><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'><h2 class='link'>" + video.snippet.title + "</h3><img class='link' src='" + video.snippet.thumbnails.medium.url + "'/></a></div>");
                $("#Result_Videos").css("border", "3px solid rgb(202,202,202)");
                $(".video").css("border-bottom", "2.5px dotted rgb(202,202,202)");
            }


            if (Prev_Page === undefined) 
                $("#Prev_btn").css("display", "none" );
            
            else 
                $("#Prev_btn").css("display", "inline");
                    

            if (Next_Page === undefined)
                $("#Next_btn").css("display", "none" );
            
            else 
                $("#Next_btn").css("display", "inline");
                    
        },

        error: function(err)
        {
            $("#Result_Videos").html('<div><p>Something went wrong.</p></div>');

        }

    });
    
});
}

function NextPage()
{
    $("#Next_btn").on("click", function(event) 
    {
    event.preventDefault();
    let input= $("#inp_video").val();
    $.ajax(
    {
        url: my_link,
        data: 
        {
            part: "snippet", 
            maxResults: 10, 
            q: input, 
            pageToken: Next_Page, 
            type: "video", 
            key: API_key
        },
        method: 'GET',
        dataType: 'json',
        success: function(responseJSON) 
        {
            $("#Result_Videos").empty();
            Next_Page = responseJSON.nextPageToken;
            Prev_Page = responseJSON.prevPageToken;
            
           
            for (let video of responseJSON.items)
            {
                $("#Result_Videos").append("<div class='video'><a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'><h2 class='link'>" + video.snippet.title + "</h3><img class='link' src='" + video.snippet.thumbnails.medium.url + "'/></a></div>");               
                $("#Result_Videos").css("border", "3px solid rgb(202,202,202)");
                $(".video").css("border-bottom", "2.5px dotted rgb(202,202,202)");

            }


            if (Prev_Page === undefined) 
                $("#Prev_btn").css("display", "none" );
            
            else 
                $("#Prev_btn").css("display", "inline");


            if (Next_Page === undefined)
                $("#Next_btn").css("display", "none");
            
            else 
                $("#Next_btn").css("display", "inline");
                    

        },

        error: function(err)
        {
            $("#Result_Videos").html('<div><p>Something went wrong.</p></div>');

        }
    })
    
});

}

Search_Videos();
PreviousPage();
NextPage();

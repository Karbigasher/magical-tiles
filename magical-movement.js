const track = document.getElementById("image-track")
const body = document.getElementById("bod")
   

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth/2

    const percentage = (mouseDelta/maxDelta)*-100,
        nextPercentage = Math.max(Math.min(parseFloat(track.dataset.prevPercentage) + percentage, 0), -100)

    track.dataset.percentage = nextPercentage

    track.animate({
        transform: `translate(${nextPercentage}%, 25%)`
    }, {duration: 1000, fill: "forwards"})

    for(const image of track.getElementsByClassName("image")){
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, {duration: 1000, fill: "forwards"})
    }
    //scary thing
    if (nextPercentage >= -100 && nextPercentage < -80)
    {
        body.style.backgroundColor = "rgb(155, 5, 5)"

    }else if (nextPercentage >= -80 && nextPercentage < -60)
    {
        body.style.backgroundColor = "rgb(16, 14, 36)"

    }else if (nextPercentage >= -60 && nextPercentage < -40)
    {
        body.style.backgroundColor = "rgb(46, 46, 46)"

    }else if (nextPercentage >= -40 && nextPercentage < -20)
    {
        body.style.backgroundColor = "rgb(133, 133, 138)"

    }else if (nextPercentage >= -20 && nextPercentage <= 0)
    {
        body.style.backgroundColor = "rgb(197, 97, 134)"
    }
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0"
    track.dataset.prevPercentage = track.dataset.percentage
}
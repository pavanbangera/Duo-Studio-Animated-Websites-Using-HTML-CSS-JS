let init = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop (value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect () {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

init();

let cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.pageX}px, ${e.pageY}px) translate(-50%, -50%)`;

})


let tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 40%",
        end: "top -30%",
        scrub: 2
    }
})
let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 video",
        scroller: ".main",
        start: "top -10%",
        end: "top -20%",
        scrub: 3
    }
})
let tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page2 h1",
        scroller: ".main",
        start: "top 0%",
        end: "top -50%",
        scrub: 3
    }
})
let tl4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page3 .part2",
        scroller: ".main",
        start: "top 20%",
        end: "top -50%",
        scrub: 3
    }
})
let tl5 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page3 .part2",
        scroller: ".main",
        start: "top 0%",
        end: "top -10%",
        scrub: 3
    }
})
let tl6 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page4",
        scroller: ".main",
        start: "top -50%",
        end: "top -150%",
        scrub: 3
    }
})
tl1.to(".page1 h1", ({
    x: "-100"

}), "anim")

tl1.to(".page1 h2", ({
    x: "100"
}), "anim")

tl1.to(".page1 .video", ({
    scale: 1
}), "anim")

tl2.to(".main", ({
    backgroundColor: "#EFEFF2",
    color: " #0f0d0d"
}))
tl2.to(".page2", ({
    opacity: 1
}))
tl3.to(".page2 span", ({
    width: "100%"
}))
tl4.to(".page3 span", ({
    width: "100%",
    backgroundColor: " #EFEFF2"
}))

tl5.to(".main", ({
    backgroundColor: "#0f0d0d",
    color: " #EFEFF2"
}))

tl6.to(".page4 span", ({
    width: "90%",
}))

let boxes = document.querySelectorAll(".page5 .box");
boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
        let image = box.getAttribute("data-image");
        cursor.style.backgroundColor = "#EFEFF2";
        cursor.style.width = "300px";
        cursor.style.height = "250px"
        cursor.style.borderRadius = "0"
        cursor.style.backgroundImage = `url(${image})`
    })
    box.addEventListener("mouseleave", () => {
        cursor.style.width = "20px";
        cursor.style.height = "20px"
        cursor.style.borderRadius = "50%"
        cursor.style.backgroundImage = `none`
        cursor.style.backgroundColor = "#DEB2F2";
    })
})
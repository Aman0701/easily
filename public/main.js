/**
 * Gets the paragraph tag element with the id 'animate'
 */
const pTag = document.getElementById('animate');

/**
 * The text to be animated
 */
const text = "job opportunities and internships.";

/**
 * Variables to keep track of the animation state
 */
let left = 0;
let t = "";
let x = " ";
let right = 0;
let pos = 0;

/**
 * Starts the animation interval
 *
 * This function creates a new interval that appends a new span element to the paragraph tag
 * for each character in the text, with a delay of 50ms between each character.
 * When the end of the text is reached, it clears the interval and restarts it after a 2s delay.
 */
function startInterval(){
    let start = setInterval(() => {
        const span = document.createElement('span');
        span.id = left;
        span.style.position = "absolute";
        span.style.font = 'bold 2rem Arial';
        span.textContent = text.charAt(left);
        span.style.left = `${pos}px`;
        document.body.appendChild(span);
        const charWidth = span.offsetWidth;
        document.body.removeChild(span);
        if(text.charAt(left) == " "){
            pos += 10;
        }else{
            pos += charWidth;
        }
       
        pTag.appendChild(span);
        left += 1;
    
        if(left == text.length){
            clearInterval(start);
            setTimeout(()=>{
                startInterval();
            },2000);
        }
        if (left > text.length) {
            let remove = document.getElementById(right);
            pTag.removeChild(remove);
            right++;
            if(right == text.length){
                
                clearInterval(start);
                    setTimeout(()=>{
                        startInterval();
                    },2000);
                    left = 0;
                    right = 0;
                    pos = 0;
            }
        }
      }, 50);
}

/**
 * Starts the animation
 */
startInterval();
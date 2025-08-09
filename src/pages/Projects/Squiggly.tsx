export const Squiggly = () => {
    const svariable_code = `    typedef struct {
            std::string name;
            VarType type;
            std::shared_ptr<void> ptr;
            bool isArray;
            int arrSize;
    } SVariable;`

    const memory_code = `    std::vector<Utils::SVariable> gVars;    //global variables
    std::vector<Utils::SVariable> sVars;    //stack variables
    std::vector<Utils::SVariable> bVars;    //built-in variables`

    return (
        <>
            <h1 id="squiggly">Squiggly</h1>
            <blockquote>
                <small><span className="fw-bold text-success-emphasis">An esoteric scripting language for game dev</span></small>
            </blockquote>
            <hr/>
            <p>The idea for Squiggly was born from my friend saying he wanted to make a mini game console with Arduino, similar to a Game Boy.</p>
            <p><img src="/Projects/Squiggly/PageImages/ChatLog2.png" alt="Chat Log" style={{ width: "500px" }} /> </p>
            <p>The idea was to originally make an Arduino library that would act as a sort of game engine. This would allow us to quickly develop games for our console (if all went well). Being excited to have a fun project to do during my winter break, I became overly optimistic about what the project could become...</p>
            <p><img src="/Projects/Squiggly/PageImages/ChatLog1.png" alt="Chat Log" style={{ width: "300px" }} /></p>
            <p>A little over the top? Maybe. However, the more I planned the project out, the more excited I became to start it. I quickly pivoted the project to be my next solo mission (rather than have it be a collaborative effort). What I initially estimated as a fun winter break project became a 9 month passion project that turned into my very first programming language: <strong>Squiggly</strong>!</p>
            <blockquote className="text-info">
                <small>As a little side note: No, I did not do much research as to how to build an interpreted language. Would that have been smart? Definitely. I did ask a professor at my school for some advice, but by the time I did I had already made a considerable amount of progress, and didn't feel like redesigning. Lazy? Maybe a little.</small>
                <br/>
                <small>Despite my stubbornness, I enjoyed the challenge of coming up with my own design for an interpreted language. Although the final product might not be the best, I&#39;m still proud of what I came up with</small>
            </blockquote>
            <hr/>
            <h2 id="what-did-i-actually-learn-">What did I actually learn?</h2>
            <p>Quite a lot actually!</p>
            <p>This was the first large-ish scale project I made with C++! I taught myself how to use CMake to generate Makefiles for my project, how to use C++ shared pointers, and how to write portable code. </p>
            <p>I also improved upon a lot of my pre-existing skills like:</p>
            <ul>
                <li><strong className="text-success-emphasis">Git + GitHub</strong>
                    <ul>
                        <li>I used version control <em>a lot</em> in this project. It&#39;s saved me from more failed experiments than I can count.</li>
                    </ul>
                </li>
                <li><strong className="text-success-emphasis">Large project planning</strong>
                    <ul>
                        <li>I love sketching out the architecture of a project before starting to write code. Squiggly was no exception. I sat down with a pen and paper and put a lot of thought into how the program would be organized, which saved me a ton of time later when I was actually writing code.</li>
                    </ul>
                </li>
                <li><strong className="text-success-emphasis">Debugging</strong>
                    <ul>
                        <li>Squiggly had more problems than I can count. I was working with pointers in a way I was not used to doing, so I ran into countless memory related issues. Debugging was often extremely difficult, and I definitely feel like I improved my ability to trace programs to find issues.</li>
                    </ul>
                </li>
                <li><strong className="text-success-emphasis">C++</strong>
                    <ul>
                        <li>I&#39;ve used C++ a ton in the past, but always to program a hardware based project. I&#39;ve never used it to develop an entire software application, and I definitely feel a lot more comfortable with the language after this project.</li>
                    </ul>
                </li>
            </ul>
            <hr/>
            <h2 id="how-does-this-project-work-">How does this project work?</h2>
            <p>I&#39;m so glad you asked (or are even reading this far)!</p>
            <h3 id="tokenizing-">Tokenizing:</h3>
            <p>Squiggly works by first &quot;compiling&quot; scripts into an in-memory representation of the code. I called this process &quot;tokenizing&quot;.</p>
            <p>Each line of raw text in an executed script is converted into a &quot;tokenized line&quot;. This is just a class that represents a line of code and contains data from the parsed line. For example, a line calling a function: <code>movePlayer(4, 2)</code> would get &quot;tokenized&quot; into a <code>CallLine</code> object: </p>
            <p><img src="/Projects/Squiggly/PageImages/TokenizedLine.png" alt="Code snippet" style={{ width: "300px" }} /></p>
            <p>You may notice I use some polymorphism here to represent a tokenized line object. There are a few reasons for that: </p>
            <ol>
                <li>To hopefully save some memory room when tokenizing programs</li>
                <li>To make it easier to store tokenized lines in a single C++ vector and reference with type casting</li>
                <li>So that I had an excuse to use polymorphism in a C++ project (I never got to do that before)</li>
            </ol>
            <h3 id="running-">Running:</h3>
            <p>When running a program, Squiggly simply loops through a C++ vector of tokenized lines, reads the data in each object, and executes a task based off of that data. </p>
            <p>For example: Squiggly encounters a <code>ASSIGN</code> line that has <code>x</code> as a destination and <code>5</code> as a source. Squiggly would then find the variable <code>x</code> in it&#39;s virtual memory (another C++ vector), converts <code>5</code> to whatever datatype <code>x</code> is (automatic implicit casting), and assign the virtual variable to the new value!</p>
            <p>I abstracted a lot of this process into (what I hope are) easy to understand functions, so the final piece of code for <code>ASSIGN</code> looks like this: </p>
            <p><img src="/Projects/Squiggly/PageImages/ASSIGNCode.png" alt="Code snippet" /></p>
            <p>This line type is one of many that Squiggly supports. The different line types, for the most part, follow the same basic outline: Cast the line pointer to the proper line type (polymorphism), get the data stored in that object, and execute code for that line.</p>
            <h3 id="variables-">Variables:</h3>
            <p>Variables in Squiggly are represented by the following struct: </p>
            <pre>
                <code className="text-primary-emphasis">{svariable_code}</code>
            </pre>
            <p>These structs are then used to represent a virtual memory:</p>
            <pre>
                <code className="text-primary-emphasis">{memory_code}</code>
            </pre>
            <p>Using the <code>name</code> property of each struct allows Squiggly to search for referenced variables. The <code>ptr</code> property stores a shared pointer to the actual data the variable is storing. The <code>type</code> property allows Squiggly to determine what datatype the <code>void</code> pointer should be casted to.</p>
            <h3 id="math-">Math:</h3>
            <p>Since my main focus was to create a language for writing silly little games, and not a math interpreter, I cheated a little and used a library for this part. </p>
            <p>All mathematical statements in Squiggly scripts are parsed using the <a href="https://github.com/ArashPartow/exprtk" target="_blank">exprtk</a> library. </p>
            <p>In order to save myself a bit of a headache of managing variables that exprtk can use in precompiled math statements (which becomes near impossible when you consider the fact that Squiggly has it&#39;s own array system that makes it so that you would need to recursively compile exprtk statements), I don&#39;t use precompiled exprtk statements. </p>
            <p>That was a mouthful so let me put it this way: In order to make my code simpler and allow me to use someone elses code for math parsing: <strong className="text-danger-emphasis">I don&#39;t precompile math equations into tree structures</strong>. This makes parsing slower, but easier to do from a programming perspective. </p>
            <p>What I do instead is manually convert each referenced variable into it&#39;s stored value in a math equation string, then compile and compute that mathematical statement without any variable names (only numbers) using exprtk. For example:</p>
            <p><code>(x+3)/y</code> -&gt; <em>convert variables to their values</em> -&gt; <code>(1+3)/2</code> -&gt; <em>pass to exprtk</em> -&gt; <code>2.0</code></p>
            <p>This method that I use is the <strong className="text-danger-emphasis">main reason why Squiggly is so dang slow</strong>. However, to fix this issue I would need to write my own math parsing library, and I don't really feel like doing that now that I "finished" and dropped the project. </p>
            <p>If I ever revisit Squiggly, I&#39;ll start from scratch and do everything right, don&#39;t worry.</p>
            <h3 id="rendering-">Rendering:</h3>
            <p>Squiggly is, after all, a language for writing games. That means it has to have a way to draw to a screen. </p>
            <p><img src="/Projects/Squiggly/PageImages/Balls.gif" alt="Example of Squiggly" /></p>
            <p>Since I wanted to make this code as portable as possible, Squiggly renders everything to a <a href="https://github.com/CodeSample15/Squiggly/blob/main/include/screen.hpp" target="_blank">virtual screen</a> which can be used to render to any frontend.</p>
            <p>Right now, I have published a port of Squiggly for Windows using <a href="https://github.com/SFML/SFML">SFML</a> and one for a small Raspberry Pi console through a <a href="https://github.com/CodeSample15/ST7735_TFT_RPI">fork I made</a> of a <a href="https://github.com/gavinlyonsrepo/ST7735_TFT_RPI">TFT screen display library</a>. </p>
            <blockquote className="text-info">
                <small>My fork of the TFT library just adds in in-memory buffer for screen data that can be edited before writing to an external device. This allows for more consistent timing with screen refreshes, and more efficient use of data writes. This improvement could have been made outside of the TFT library, but I did this to keep my main code neater.</small>
            </blockquote>
            <hr/>
            <h2 id="final-thoughts">Final thoughts</h2>
            <p>Squiggly was definitely worth the time and effort. I may have not achieved perfect results (or anything close to that), but I achieved results worth sharing and being proud of. I also had a lot of fun on this coding adventure, and learned a lot in the process.</p>
            <p>And yes, I did end up building the game console. I had to use a Raspberry Pi instead of an Arduino, but it still came out pretty cool. You can play Squiggly Flappy Bird on it!</p>
            <p><img className="p-2" src="/Projects/Squiggly/PageImages/game_console.jpg" alt="game console" style={{ width: "200px" }} /> <img src="/Projects/Squiggly/PageImages/Flappy Bird.gif" alt="flappy bird" style={{ width: "300px" }} /></p>
        </>
    )
}

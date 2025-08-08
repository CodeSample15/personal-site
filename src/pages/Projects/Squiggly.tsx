export const Squiggly = () => {
    return (
        <>
            <h1 id="squiggly">Squiggly</h1>
            <blockquote>
                <p>An esoteric scripting language for game dev</p>
            </blockquote>
            <p>The idea for Squiggly was born from my friend saying he wanted to make a mini game console with Arduino, similar to a Game Boy.</p>
            <p><img src="PageImages/ChatLog1.png" alt="Chat Log" style={{ width: "300px" }} /> </p>
            <p>The idea was to originally make an Arduino library that would act as a sort of game engine. Being excited to have a fun project to do during my winter break, I became overly optimistic about what the project could become...</p>
            <p><img src="PageImages/ChatLog2.png" alt="Chat Log" style={{ width: "300px" }} /></p>
            <p>Of course, being as excited as I was, I started working on it early and made it a solo project for myself. What I estimated to be a fun winter break project became a 9 month passion project that turned into my very first programming language: <strong>Squiggly</strong>!</p>
            <blockquote>
                <p>As a little side note: No, I did not do much research as to how to build an interpreted language. Would that have been smart? Definitely. I did as a professor at my school for some advice, but by the time I did I already had made a considerable amount of progress I did not want to loose yet with a redesign. </p>
                <p>Despite my stubbornness, I enjoyed the challenge of coming up with my own design for an interpreted language. Although the final product might not be the best, I&#39;m still proud of what I came up with</p>
            </blockquote>
            <h2 id="what-did-i-actually-learn-">What did I actually learn?</h2>
            <p>Quite a lot actually!</p>
            <p>This was the first large-ish scale project I made with C++! I taught myself how to use CMake to generate Makefiles for my project, how to use C++ shared pointers, and how to write portable code. </p>
            <p>I also improved upon a lot of my pre-existing skills like:</p>
            <ul>
                <li>Git + GitHub<ul>
                    <li>I used version control <em>a lot</em> in this project. It&#39;s saved me from more failed experiments than I can count.<ul>
                        <li>Large project planning</li>
                    </ul>
                    </li>
                    <li>I love sketching out the architecture of a project before starting to write code. Squiggly was no exception. I sat down with a pen and paper and put a lot of thought into how the program would be organized, which saved me a ton of time later when I was actually writing code.<ul>
                        <li>Debugging</li>
                    </ul>
                    </li>
                    <li>Squiggly had more problems than I can count. I was working with pointers in a way I was not used to doing, so I ran into countless memory related issues. Debugging was often extremely difficult, and I definitely feel like I improved my ability to trace programs to find issues.<ul>
                        <li>C++</li>
                    </ul>
                    </li>
                    <li>I&#39;ve used C++ a ton in the past, but always to program a hardware based project. I&#39;ve never used it to develop an entire software application, and I definitely feel a lot more comfortable with the language after this project.</li>
                </ul>
                </li>
            </ul>
            <h2 id="how-does-this-project-work-">How does this project work?</h2>
            <p>I&#39;m so glad you asked (or are even reading this far)!</p>
            <h3 id="tokenizing-">Tokenizing:</h3>
            <p>Squiggly works by first &quot;compiling&quot; scripts into an in-memory representation of the code. I called this process &quot;tokenizing&quot;.</p>
            <p>Each line of raw text in a script that&#39;s being executed is converted into a &quot;tokenized line&quot;. For example, a line calling a function: <code>movePlayer(4, 2)</code> would get &quot;tokenized&quot; into a <code>CALL</code> line object: </p>
            <p><img src="PageImages/TokenizedLine.png" alt="Code snippet" style={{ width: "300px" }} /></p>
            <p>You may notice I use some polymorphism here to represent a tokenized line object. There are two reasons for that: </p>
            <ol>
                <li>To hopefully save some memory room when tokenizing programs</li>
                <li>To make it easier to store tokenized lines in a single C++ vector and reference with type casting</li>
                <li>So that I had an excuse to use polymorphism in a C++ project (I never got to do that before)</li>
            </ol>
            <h3 id="running-">Running:</h3>
            <p>When running a program, Squiggly simply loops through a C++ vector of tokenized lines, reads the data in each object, and executes a task based off of that data. </p>
            <p>For example: Squiggly encounters a <code>ASSIGN</code> line that has <code>x</code> as a destination and <code>5</code> as a source. Squiggly would then find the variable <code>x</code> in it&#39;s virtual memory (another C++ vector), converts <code>5</code> to whatever datatype <code>x</code> is (automatic implicit casting), and assign the virtual variable to the new value!</p>
            <p>I abstracted a lot of this process into (what I hope are) easy to understand functions, so the final piece of code for <code>ASSIGN</code> looks like this: </p>
            <p><img src="PageImages/ASSIGNCode.png" alt="Code snippet" /></p>
            <h3 id="variables-">Variables:</h3>
            <p>Variables in Squiggly are represented by the following struct: </p>
            <pre><code className="lang-C++"><span className="hljs-comment">//utils.hpp</span>
                <span className="hljs-keyword">typedef</span> <span className="hljs-keyword">struct</span>
                <span className="hljs-built_in">std</span>::<span className="hljs-built_in">string</span> name;
                VarType type;
                <span className="hljs-built_in">std</span>::<span className="hljs-built_in">shared_ptr</span>&lt;<span className="hljs-keyword">void</span>&gt; ptr;
                <span className="hljs-keyword">bool</span> isArray;
                <span className="hljs-keyword">int</span> arrSize;
                SVariable;
            </code></pre>
            <p>These structs are then used to represent a virtual memory:</p>
            <pre><code className="lang-C++"><span className="hljs-comment">//runner.cpp</span>
                <span className="hljs-comment">//virtual memory buffers</span>
                <span className="hljs-built_in">std</span>::<span className="hljs-built_in">vector</span>&lt;Utils::SVariable&gt; gVars;    <span className="hljs-comment">//global variables</span>
                <span className="hljs-built_in">std</span>::<span className="hljs-built_in">vector</span>&lt;Utils::SVariable&gt; sVars;    <span className="hljs-comment">//stack variables</span>
                <span className="hljs-built_in">std</span>::<span className="hljs-built_in">vector</span>&lt;Utils::SVariable&gt; bVars;    <span className="hljs-comment">//built-in variables</span>
            </code></pre>
            <p>Using the <code>name</code> property of each struct allows squiggly to search for referenced variables. The <code>ptr</code> property stores a shared pointer to the actual data the variable is storing. The <code>type</code> property allows Squiggly to determine what datatype the <code>void</code> pointer should be casted to.</p>
            <h3 id="math-">Math:</h3>
            <p>Since my main focus was to create a language for writing silly little games, and not a math interpreter, I cheated a little and used a library for this part. </p>
            <p>All mathematical statements in Squiggly scripts are parsed using the <a href="https://github.com/ArashPartow/exprtk">exprtk</a> library. </p>
            <p>In order to save myself a bit of a headache of managing variables that exprtk can used in precompiled math statements (which becomes near impossible when you consider the fact that Squiggly has it&#39;s own array system that makes it so that you would need to recursively compile exprtk statements), I don&#39;t use precompiled exprtk statements. </p>
            <p>That was a mouthful so let me put it this way: In order to make my code simpler and allow me to use someone elses code for math parsing: <strong>I don&#39;t precompile math statements into tree structures</strong>. This makes parsing slower, but easier to do from a programming perspective. </p>
            <p>What I do instead is manually convert each referenced variable into it&#39;s raw value, then compile that mathematical statement without any variables. For example:</p>
            <p><code>(x+3)/y</code> -&gt; <em>convert variables to their values</em> -&gt; <code>(1+3)/2</code> -&gt; <em>pass to exprtk</em> -&gt; <code>2 (double)</code></p>
            <p>This method that I use is the <strong>main reason why Squiggly is so dang slow</strong>. However, to fix this issue I would need to write my own math parsing library, and I wanted to drop this project a while ago anyways. </p>
            <p>If I ever revisit this project, I&#39;ll start from scratch and do everything right, don&#39;t worry.</p>
            <h3 id="rendering-">Rendering:</h3>
            <p>Squiggly is, after all, a language for writing games. That means it has to have a way to draw to a screen. </p>
            <p><img src="PageImages/Balls.gif" alt="Example of Squiggly" /></p>
            <p>Since I wanted to make this code as portable as possible, Squiggly renders everything to a <a href="https://github.com/CodeSample15/Squiggly/blob/main/include/screen.hpp">virtual screen</a>.</p>
            <p>This screen can then be used to display the output of Squiggly to virtually any device. Right now, I have published a port of Squiggly for Windows using <a href="https://github.com/SFML/SFML">SFML</a> and one for a small Raspberry Pi console through a <a href="https://github.com/CodeSample15/ST7735_TFT_RPI">fork I made</a> of a <a href="https://github.com/gavinlyonsrepo/ST7735_TFT_RPI">TFT screen display library</a>. </p>
            <blockquote>
                <p>My fork of the TFT library just allows for in-memory editing of the TFT data before writing to an external device. This allows for more consistent timing with screen refreshes, and more efficient use of data writes. This improvement could have been made outside of the TFT library, but I did this to keep my main code neater.</p>
            </blockquote>
            <h2 id="final-thoughts">Final thoughts</h2>
            <p>Squiggly was definitely worth the time and effort. I may have not achieved perfect results (or anything close to that), but I achieved results worth sharing and being proud of. </p>
            <p>I simplified a lot of what&#39;s going on behind the scenes, so I may revisit this page to update it over time. </p>
            <p><img src="PageImages/game_console.jpg" alt="game console" style={{ width: "200px" }} /> <img src="PageImages/Flappy Bird.gif" alt="flappy bird" style={{ width: "300px" }} /></p>
        </>
    )
}

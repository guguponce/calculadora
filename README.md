# calculator-without-eval()

Simple operations calculator, that also makes a registry of the math operations and let's you reuse them.

## description

During my learning of Javascript I made a couple of calculator using Vanilla JS. It helped me not only to understand the logic behind it, but also to comprehend the DOM.
Back then I researched about how to best perform the math operations coming from strings. All of the solutions I found were either the use of eval() (90% of the cases) or Function().

eval() and Function() are pretty powerful tools in JavaScript, but in every documentation their use is not recommended, because arbitrary code can be executed by a technical users or ones with bad intentions.
"eval() is particularly dangerous. This is because it allows one to execute code with the same privileges as the caller of eval(). Say you create an app that evaluates some code and stores the result on the user’s machine using the FileApi in the browser; the user can use eval() against your app and get access to FileAPI to carry out malicious tasks."
(https://www.educative.io/answers/eval-vs-function-in-javascript)

This made me think that probably, when I would learn React further on time, I would probably find an easy solution for this little problem.
Some solutions included performing the math operations every time the users added a second number, but that does not permit create longer equations and also not perform multiplications or divisions between pluses or minuses.
Then I realised that the only solution would probably to add a larger logic behind the scenes.
I always liked this calculator project, that is why I chose it as my first Typescript/React one.


const Kw = ({ children }) => <span style={{ color: "#c678dd" }}>{children}</span>;
const St = ({ children }) => <span style={{ color: "#98c379" }}>{children}</span>;
const Fn = ({ children }) => <span style={{ color: "#61afef" }}>{children}</span>;
const Cm = ({ children }) => <span style={{ color: "#5c6370" }}>{children}</span>;
const Nm = ({ children }) => <span style={{ color: "#d19a66" }}>{children}</span>;
const Tx = ({ children }) => <span style={{ color: "#abb2bf" }}>{children}</span>;

function Ln({ n, children }) {
  return (
    <div className="flex">
      <span
        className="shrink-0 text-right select-none"
        style={{ width: 24, marginRight: 16, color: "#3e4358" }}
      >
        {n}
      </span>
      <span>{children}</span>
    </div>
  );
}

function CodeBlock({ children, style }) {
  return (
    <pre
      className="absolute font-mono text-[12px] leading-[22px] whitespace-pre select-none pointer-events-none"
      style={{ opacity: 0.07, ...style }}
    >
      {children}
    </pre>
  );
}

export default function CodeBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
    >
      <div className="absolute inset-0 bg-dot-grid" />

      <div className="absolute top-[5%] left-[8%] w-[600px] h-[600px] rounded-full blur-[150px]" style={{ background: "rgba(34,211,238,0.035)" }} />
      <div className="absolute top-[45%] right-[5%] w-[500px] h-[500px] rounded-full blur-[130px]" style={{ background: "rgba(99,102,241,0.03)" }} />
      <div className="absolute bottom-[10%] left-[35%] w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: "rgba(168,85,247,0.025)" }} />

      <CodeBlock style={{ top: "3%", left: "2%", transform: "rotate(-1deg)" }}>
        <Ln n={1}><Cm>{"// server.js"}</Cm></Ln>
        <Ln n={2}><Kw>const</Kw><Tx> express = </Tx><Fn>require</Fn><Tx>(</Tx><St>{"'express'"}</St><Tx>);</Tx></Ln>
        <Ln n={3}><Kw>const</Kw><Tx> cors = </Tx><Fn>require</Fn><Tx>(</Tx><St>{"'cors'"}</St><Tx>);</Tx></Ln>
        <Ln n={4}><Kw>const</Kw><Tx> app = </Tx><Fn>express</Fn><Tx>();</Tx></Ln>
        <Ln n={5} />
        <Ln n={6}><Tx>app.</Tx><Fn>use</Fn><Tx>(</Tx><Fn>cors</Fn><Tx>());</Tx></Ln>
        <Ln n={7}><Tx>app.</Tx><Fn>use</Fn><Tx>(express.</Tx><Fn>json</Fn><Tx>());</Tx></Ln>
        <Ln n={8} />
        <Ln n={9}><Cm>{"// Configure API routes"}</Cm></Ln>
        <Ln n={10}><Tx>app.</Tx><Fn>use</Fn><Tx>(</Tx><St>{"'/api/users'"}</St><Tx>, userRouter);</Tx></Ln>
        <Ln n={11}><Tx>app.</Tx><Fn>use</Fn><Tx>(</Tx><St>{"'/api/orders'"}</St><Tx>, orderRouter);</Tx></Ln>
        <Ln n={12} />
        <Ln n={13}><Tx>app.</Tx><Fn>listen</Fn><Tx>(</Tx><Nm>3000</Nm><Tx>, () =&gt; {"{"}</Tx></Ln>
        <Ln n={14}><Tx>{"  "}console.</Tx><Fn>log</Fn><Tx>(</Tx><St>{"'Server running on :3000'"}</St><Tx>);</Tx></Ln>
        <Ln n={15}><Tx>{"}"});</Tx></Ln>
      </CodeBlock>

      <CodeBlock style={{ top: "5%", right: "3%", transform: "rotate(1deg)" }}>
        <Ln n={1}><Cm>{"// db.service.js"}</Cm></Ln>
        <Ln n={2}><Kw>const</Kw><Tx>{" { Pool } = "}</Tx><Fn>require</Fn><Tx>(</Tx><St>{"'pg'"}</St><Tx>);</Tx></Ln>
        <Ln n={3}><Kw>const</Kw><Tx> pool = </Tx><Kw>new</Kw><Tx> </Tx><Fn>Pool</Fn><Tx>({"{"}</Tx></Ln>
        <Ln n={4}><Tx>{"  host: "}</Tx><St>{"'localhost'"}</St><Tx>,</Tx></Ln>
        <Ln n={5}><Tx>{"  port: "}</Tx><Nm>5432</Nm><Tx>,</Tx></Ln>
        <Ln n={6}><Tx>{"  database: "}</Tx><St>{"'app_db'"}</St><Tx>,</Tx></Ln>
        <Ln n={7}><Tx>{"}"});</Tx></Ln>
        <Ln n={8} />
        <Ln n={9}><Kw>async function</Kw><Tx> </Tx><Fn>getUsers</Fn><Tx>() {"{"}</Tx></Ln>
        <Ln n={10}><Tx>{"  "}</Tx><Kw>const</Kw><Tx>{" { rows } = "}</Tx><Kw>await</Kw><Tx> pool.</Tx><Fn>query</Fn><Tx>(</Tx></Ln>
        <Ln n={11}><Tx>{"    "}</Tx><St>{"'SELECT * FROM users WHERE active = $1'"}</St></Ln>
        <Ln n={12}><Tx>{"    , ["}</Tx><Kw>true</Kw><Tx>]</Tx></Ln>
        <Ln n={13}><Tx>{"  );"}</Tx></Ln>
        <Ln n={14}><Tx>{"  "}</Tx><Kw>return</Kw><Tx> rows;</Tx></Ln>
        <Ln n={15}><Tx>{"}"}</Tx></Ln>
      </CodeBlock>

      <CodeBlock style={{ top: "35%", left: "1%", transform: "rotate(0.5deg)" }}>
        <Ln n={1}><Cm>{"// cache.middleware.js"}</Cm></Ln>
        <Ln n={2}><Kw>const</Kw><Tx> Redis = </Tx><Fn>require</Fn><Tx>(</Tx><St>{"'ioredis'"}</St><Tx>);</Tx></Ln>
        <Ln n={3}><Kw>const</Kw><Tx> redis = </Tx><Kw>new</Kw><Tx> </Tx><Fn>Redis</Fn><Tx>(</Tx><Nm>6379</Nm><Tx>);</Tx></Ln>
        <Ln n={4} />
        <Ln n={5}><Kw>async function</Kw><Tx> </Tx><Fn>cacheMiddleware</Fn><Tx>(req, res, next) {"{"}</Tx></Ln>
        <Ln n={6}><Tx>{"  "}</Tx><Kw>const</Kw><Tx> key = </Tx><St>{"`cache:${req.originalUrl}`"}</St><Tx>;</Tx></Ln>
        <Ln n={7}><Tx>{"  "}</Tx><Kw>const</Kw><Tx> cached = </Tx><Kw>await</Kw><Tx> redis.</Tx><Fn>get</Fn><Tx>(key);</Tx></Ln>
        <Ln n={8} />
        <Ln n={9}><Tx>{"  "}</Tx><Kw>if</Kw><Tx> (cached) {"{"}</Tx></Ln>
        <Ln n={10}><Tx>{"    "}</Tx><Kw>return</Kw><Tx> res.</Tx><Fn>json</Fn><Tx>(JSON.</Tx><Fn>parse</Fn><Tx>(cached));</Tx></Ln>
        <Ln n={11}><Tx>{"  }"}</Tx></Ln>
        <Ln n={12}><Tx>{"  "}</Tx><Kw>await</Kw><Tx> redis.</Tx><Fn>set</Fn><Tx>(key, data, </Tx><St>{"'EX'"}</St><Tx>, </Tx><Nm>3600</Nm><Tx>);</Tx></Ln>
        <Ln n={13}><Tx>{"  "}</Tx><Fn>next</Fn><Tx>();</Tx></Ln>
        <Ln n={14}><Tx>{"}"}</Tx></Ln>
      </CodeBlock>

      <CodeBlock style={{ top: "38%", right: "2%", transform: "rotate(-0.5deg)" }}>
        <Ln n={1}><Cm>{"// auth.middleware.js"}</Cm></Ln>
        <Ln n={2}><Kw>const</Kw><Tx> jwt = </Tx><Fn>require</Fn><Tx>(</Tx><St>{"'jsonwebtoken'"}</St><Tx>);</Tx></Ln>
        <Ln n={3} />
        <Ln n={4}><Kw>function</Kw><Tx> </Tx><Fn>verifyToken</Fn><Tx>(req, res, next) {"{"}</Tx></Ln>
        <Ln n={5}><Tx>{"  "}</Tx><Kw>const</Kw><Tx> token = req.headers[</Tx><St>{"'authorization'"}</St><Tx>]</Tx></Ln>
        <Ln n={6}><Tx>{"    "}?.</Tx><Fn>split</Fn><Tx>(</Tx><St>{"' '"}</St><Tx>)[</Tx><Nm>1</Nm><Tx>];</Tx></Ln>
        <Ln n={7} />
        <Ln n={8}><Tx>{"  "}</Tx><Kw>if</Kw><Tx> (!token) {"{"}</Tx></Ln>
        <Ln n={9}><Tx>{"    "}</Tx><Kw>return</Kw><Tx> res.</Tx><Fn>status</Fn><Tx>(</Tx><Nm>401</Nm><Tx>).</Tx><Fn>json</Fn><Tx>({"{"}</Tx></Ln>
        <Ln n={10}><Tx>{"      error: "}</Tx><St>{"'Unauthorized'"}</St></Ln>
        <Ln n={11}><Tx>{"    }"});</Tx></Ln>
        <Ln n={12}><Tx>{"  }"}</Tx></Ln>
        <Ln n={13}><Tx>{"  req.user = jwt."}</Tx><Fn>verify</Fn><Tx>(token, SECRET);</Tx></Ln>
        <Ln n={14}><Tx>{"  "}</Tx><Fn>next</Fn><Tx>();</Tx></Ln>
        <Ln n={15}><Tx>{"}"}</Tx></Ln>
      </CodeBlock>

      <CodeBlock style={{ top: "68%", left: "3%", transform: "rotate(-0.8deg)" }}>
        <Ln n={1}><Cm>{"// queue.service.js"}</Cm></Ln>
        <Ln n={2}><Kw>const</Kw><Tx> amqp = </Tx><Fn>require</Fn><Tx>(</Tx><St>{"'amqplib'"}</St><Tx>);</Tx></Ln>
        <Ln n={3} />
        <Ln n={4}><Kw>async function</Kw><Tx> </Tx><Fn>publishMessage</Fn><Tx>(queue, payload) {"{"}</Tx></Ln>
        <Ln n={5}><Tx>{"  "}</Tx><Kw>const</Kw><Tx> conn = </Tx><Kw>await</Kw><Tx> amqp.</Tx><Fn>connect</Fn><Tx>(</Tx></Ln>
        <Ln n={6}><Tx>{"    "}</Tx><St>{"'amqp://localhost'"}</St></Ln>
        <Ln n={7}><Tx>{"  );"}</Tx></Ln>
        <Ln n={8}><Tx>{"  "}</Tx><Kw>const</Kw><Tx> channel = </Tx><Kw>await</Kw><Tx> conn.</Tx><Fn>createChannel</Fn><Tx>();</Tx></Ln>
        <Ln n={9} />
        <Ln n={10}><Tx>{"  "}</Tx><Kw>await</Kw><Tx> channel.</Tx><Fn>assertQueue</Fn><Tx>(queue);</Tx></Ln>
        <Ln n={11}><Tx>{"  channel."}</Tx><Fn>sendToQueue</Fn><Tx>(queue,</Tx></Ln>
        <Ln n={12}><Tx>{"    Buffer."}</Tx><Fn>from</Fn><Tx>(JSON.</Tx><Fn>stringify</Fn><Tx>(payload))</Tx></Ln>
        <Ln n={13}><Tx>{"  );"}</Tx></Ln>
        <Ln n={14}><Tx>{"}"}</Tx></Ln>
      </CodeBlock>

      <CodeBlock style={{ top: "70%", right: "2%", transform: "rotate(0.6deg)" }}>
        <Ln n={1}><Cm>{"// docker-compose.yml"}</Cm></Ln>
        <Ln n={2}><Fn>version</Fn><Tx>: </Tx><St>{"'3.8'"}</St></Ln>
        <Ln n={3}><Fn>services</Fn><Tx>:</Tx></Ln>
        <Ln n={4}><Tx>{"  "}</Tx><Fn>api</Fn><Tx>:</Tx></Ln>
        <Ln n={5}><Tx>{"    build: "}</Tx><St>{"'.'"}</St></Ln>
        <Ln n={6}><Tx>{"    ports:"}</Tx></Ln>
        <Ln n={7}><Tx>{"      - "}</Tx><St>{'"3000:3000"'}</St></Ln>
        <Ln n={8}><Tx>{"    environment:"}</Tx></Ln>
        <Ln n={9}><Tx>{"      NODE_ENV: "}</Tx><St>{"production"}</St></Ln>
        <Ln n={10}><Tx>{"      DB_HOST: "}</Tx><St>{"postgres"}</St></Ln>
        <Ln n={11}><Tx>{"  "}</Tx><Fn>postgres</Fn><Tx>:</Tx></Ln>
        <Ln n={12}><Tx>{"    image: "}</Tx><St>{"postgres:15-alpine"}</St></Ln>
        <Ln n={13}><Tx>{"  "}</Tx><Fn>redis</Fn><Tx>:</Tx></Ln>
        <Ln n={14}><Tx>{"    image: "}</Tx><St>{"redis:7-alpine"}</St></Ln>
      </CodeBlock>

      <div className="absolute left-10 top-0 bottom-0 w-px" style={{ background: "rgba(30,35,46,0.5)" }} />
      <div className="absolute right-10 top-0 bottom-0 w-px" style={{ background: "rgba(30,35,46,0.5)" }} />
    </div>
  );
}

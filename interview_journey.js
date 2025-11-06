const { useState, useEffect } = React;

function InterviewJourneyPage() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [
    { id: 1, title: "Step 1", label: "測驗 / 問卷填寫", hash: "#step-1" },
    { id: 2, title: "Step 2", label: "視訊 / 現場面試", hash: "#step-2" },
    { id: 3, title: "Step 3", label: "結果通知", hash: "#step-3" },
  ];
  const progressWidth = `${(activeStep / steps.length) * 100}%`;
  const goStep = (id) => {
    setActiveStep(id);
    const el = document.querySelector(`#step-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id^="step-"]'));
    if (!sections.length) return;
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (window.scrollY >= docHeight - 5) {
        setActiveStep(3);
        return;
      }
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const top = section.offsetTop;
        if (scrollY >= top) {
          setActiveStep(i + 1);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const ClockIcon = ({ className = "" }) =>
    React.createElement(
      "svg",
      { className, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
      React.createElement("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
      React.createElement("path", {
        d: "M12 7v6l4 2",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      })
    );
  return React.createElement(
    "div",
    { className: "min-h-screen text-[#191919] bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_70%,#FDF1F2_100%)]" },
    React.createElement(
      "div",
      { className: "sticky top-0 z-20 bg-white/85 backdrop-blur-md text-[#191919] shadow-[0_0_18px_#FFDFDF]" },
      React.createElement(
        "div",
        { className: "mx-auto max-w-5xl px-6 h-12 flex items-center" },
        React.createElement(
          "div",
          { className: "font-bold tracking-tight text-lg" },
          React.createElement("span", { className: "text-[#e21e28]" }, "CM"),
          React.createElement("span", { className: "text-[#191919]" }, "oney 面試旅程")
        )
      )
    ),
    React.createElement(
      "div",
      { className: "sticky top-12 z-10 bg-white/60 backdrop-blur-md py-4" },
      React.createElement(
        "div",
        { className: "mx-auto max-w-5xl px-4" },
        React.createElement(
          "div",
          { className: "grid grid-cols-3 text-center mb-2" },
          steps.map((s) =>
            React.createElement(
              "button",
              { key: s.id, onClick: () => goStep(s.id), className: "flex flex-col items-center" },
              React.createElement(
                "span",
                {
                  className: `text-sm font-semibold ${s.id <= activeStep ? "text-[#e21e28]" : "text-neutral-400"}`,
                },
                s.title
              ),
              React.createElement("span", { className: "text-xs text-[#303030]" }, s.label)
            )
          )
        ),
        React.createElement(
          "div",
          { className: "relative h-[4px] mx-2 rounded-full bg-[#d9d9d9]" },
          React.createElement("div", {
            className:
              "absolute left-0 top-0 h-[4px] bg-[#e21e28] rounded-full transition-all duration-500",
            style: { width: progressWidth },
          })
        )
      )
    ),
    React.createElement(
      "div",
      { className: "mx-auto max-w-5xl px-6 pb-10" },
      React.createElement("footer", { className: "pb-10 text-sm text-[#555]" }, "若您對流程有任何疑問，請回覆甄試邀請信，我們將盡速協助。")
    )
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(InterviewJourneyPage));

import { MessageSquare } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

const MAX_LENGTH = 255;
const button = "rounded-md border px-3.5 py-[7px] text-sm font-medium transition-colors";
const primary = `${button} border-brand-navy bg-brand-navy text-white hover:bg-brand-navy/90`;
const secondary = `${button} border-border bg-surface hover:bg-surface-subtle`;

export function StoryFeedback() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const reset = () => {
    setText("");
    setError(false);
    setSent(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    // Nothing is sent yet; the feedback request goes here once the backend exists.
    if (text.trim()) setSent(true);
    else setError(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="flex items-center gap-1.5 rounded-full bg-surface-subtle px-3.5 py-2 text-sm font-medium text-brand-navy/70 transition-colors hover:bg-brand-link/10 hover:text-brand-link"
      >
        <MessageSquare className="h-4 w-4" />
        Send feedback
      </button>

      <dialog
        ref={dialogRef}
        onClose={reset}
        onClick={(event) => event.target === event.currentTarget && dialogRef.current?.close()}
        className="m-auto w-[min(460px,calc(100vw-32px))] rounded-card border border-border p-0 backdrop:bg-brand-navy/45"
      >
        <form method="dialog" onSubmit={sent ? undefined : submit} className="p-6">
          {sent ? (
            <>
              <h2 className="mb-1.5 text-base font-bold">Thanks for your feedback</h2>
              <p className="mb-5 text-[13.5px] text-brand-navy/60">It is visible only to the admins and the author of this page.</p>
              <button className={primary}>Done</button>
            </>
          ) : (
            <>
              <h2 className="mb-2 text-[17px] font-bold">Send feedback</h2>
              <p className="mb-4 text-[13px] leading-[1.55] text-brand-navy/60">
                Help make this page more useful. Feedback is visible only to the admins and the author.
              </p>
              <textarea
                value={text}
                maxLength={MAX_LENGTH}
                aria-label="Feedback"
                onChange={(event) => {
                  setText(event.target.value);
                  setError(false);
                }}
                placeholder="For example, ‘content needs to be updated’ or ‘there is a spelling mistake’"
                className={`block min-h-[120px] w-full resize-y rounded-md border px-3 py-2.5 text-sm outline-none focus:border-brand-link ${error ? "border-red-700" : "border-border"}`}
              />
              <div className="mt-1.5 flex justify-between text-xs text-brand-navy/45">
                <span role="alert" className="font-semibold text-red-700">
                  {error && "Please add a few words."}
                </span>
                <span>{MAX_LENGTH - text.length} characters remaining</span>
              </div>
              <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={() => dialogRef.current?.close()} className={secondary}>
                  Cancel
                </button>
                <button type="submit" className={primary}>
                  Send
                </button>
              </div>
            </>
          )}
        </form>
      </dialog>
    </>
  );
}

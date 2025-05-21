interface CounterProps {
  count: number;
  maxCharacters: number;
}

export const TextCounter = ({ count, maxCharacters }: CounterProps) => {
  return (
    <div className="flex justify-end px-5 font-primary text-base">
      <span>
        {count}/{maxCharacters}
      </span>
    </div>
  );
};

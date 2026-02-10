const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div
        className="w-12 h-12 border-2 animate-spin rounded-full border-rose-500 border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;

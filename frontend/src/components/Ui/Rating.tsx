function Rating({
    rating,
    setRating,
}: {
    rating: number;
    setRating: Function;
}) {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => {
                return (
                    <span
                        key={star}
                        className={`${
                            rating >= star
                                ? "text-amber-400"
                                : "text-neutral-500"
                        } cursor-pointer text-3xl`}
                        onClick={() => {
                            setRating(star);
                        }}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
}

export default Rating;

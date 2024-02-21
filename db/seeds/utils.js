exports.convertTimestampToDate = ({ start_time, ...otherProperties }) => {
    if (!start_time) return { ...otherProperties };
    return { start_time: new Date(start_time), ...otherProperties };
  };
// Placeholder entries for courses that are planned but not yet written.
// Each still shows up in the course picker (grouped correctly, with a real
// one-line summary) but is marked comingSoon so the UI can show it as
// disabled instead of linking into an empty lesson.

function stub(id, title, category, summary) {
  return { id, title, category, summary, comingSoon: true, topics: [] };
}

export const comingSoonCourses = [];

const filterThemes = (
  data: { disciplina: string; tema: string }[],
  subject: string
): string[] => {
  return data
    .filter((item) => item.disciplina === subject)
    .map((item) => item.tema);
};

export default filterThemes;

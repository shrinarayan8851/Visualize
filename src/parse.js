const libclang = require("libclang");

function parseCode(code) {
  const index = new libclang.Index(1, 1);

  const unit = new libclang.TranslationUnit.fromSource(
    index,
    "temp.cpp",
    [],
    [code]
  );

  const cursor = unit.getCursor();

  const parsedData = [];

  cursor.visitChildren((parent, child) => {
    if (child.kind === libclang.CursorKind.VAR_DECL) {
      const variableName = child.getSpelling();
      const variableType = child.getType().getSpelling();

      let variableValue = null;
      child.visitChildren((parent, child) => {
        if (child.kind === libclang.CursorKind.INTEGER_LITERAL) {
          variableValue = child.getSpelling();
          return libclang.CursorVisit.BREAK;
        }
        return libclang.CursorVisit.CONTINUE;
      });

      parsedData.push({
        name: variableName,
        type: variableType,
        value: variableValue,
      });
    }

    return libclang.CursorVisit.CONTINUE;
  });

  unit.dispose();
  index.dispose();

  return parsedData;
}

module.exports = { parseCode };

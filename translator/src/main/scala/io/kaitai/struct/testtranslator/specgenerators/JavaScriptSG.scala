package io.kaitai.struct.testtranslator.specgenerators

import _root_.io.kaitai.struct.{ClassTypeProvider, ImportList, RuntimeConfig}
import _root_.io.kaitai.struct.datatype.{DataType, KSError}
import _root_.io.kaitai.struct.datatype.DataType.BytesType
import _root_.io.kaitai.struct.exprlang.Ast
import _root_.io.kaitai.struct.languages.JavaScriptCompiler
import _root_.io.kaitai.struct.testtranslator.{ExpectedException, Main, TestAssert, TestEquals, TestSpec}
import _root_.io.kaitai.struct.translators.JavaScriptTranslator

class JavaScriptSG(spec: TestSpec, provider: ClassTypeProvider) extends BaseGenerator(spec) {
  val className: String = JavaScriptCompiler.type2class(spec.id)
  // JavaScriptTranslator accepts an ImportList so that if it translates an enum
  // literal referencing an external enum (e.g. `external_spec::enum::label`),
  // it can generate an import of the .ksy module in which the enum is defined.
  // We don't pass our main `importList` and instead create a separate
  // ImportList, because we don't want to output these imports at the top level.
  // The reason is that they might refer to generated parsers that don't exist
  // or contain syntax errors because of KSC bugs, and if a top-level
  // `import` fails, then the test spec "crashes" without the test framework
  // having a clue what test it was).
  //
  // For now, we use `spec.extraImports` (i.e. the manually specified `imports`
  // in the .kst spec) in runParse() instead, which we can output into the test
  // body (which means that `import` failures will be assigned correctly to
  // the specific test). We cannot use `translatorImportList` there because it
  // will still be empty at that point - some refactoring would be needed to use
  // it instead of `spec.extraImports`.
  val config = RuntimeConfig()
  val translatorImportList = new ImportList()
  val translator = new JavaScriptTranslator(provider, translatorImportList, config)

  importList.add("import fs from 'node:fs';")
  importList.add("import assert from 'node:assert/strict';")
  importList.add("import { KaitaiStream } from 'kaitai-struct';")

  override def fileName(name: String): String = s"spec/Test$className.js"

  override def header(): Unit = {
    out.puts(s"describe('$className', () => {")
    out.inc
    out.puts("it('parses test properly', async () => {")
    out.inc
    out.puts(s"const { $className } = await import('#testformats/$className.js');")
    spec.extraImports.foreach { (entry) =>
      val entryClass = JavaScriptCompiler.type2class(entry)
      out.puts(s"const { $entryClass } = await import('#testformats/$entryClass.js');")
    }
  }

  override def runParse(): Unit = {
    out.puts(s"const io = new KaitaiStream(fs.readFileSync('src/${spec.data}'));")
    out.puts(s"const r = new $className(io);")
  }

  override def runParseExpectError(expException: ExpectedException): Unit = {
    val exception = expException.exception
    val excClass = JavaScriptCompiler.ksErrorName(exception)
    out.puts(s"const io = new KaitaiStream(fs.readFileSync('src/${spec.data}'));")
    out.puts(s"assert.ok($excClass);")
    out.puts(s"assert.throws(() => new $className(io), $excClass);")
  }

  override def footer(): Unit = {
    out.dec
    out.puts("});")
    out.dec
    out.puts("});")
  }

  override def simpleEquality(check: TestEquals): Unit = {
    val actType = translator.detectType(check.actual)
    val actStr = translateAct(check.actual)
    val expStr = translator.translate(check.expected)
    actType match {
      case _: BytesType =>
        out.puts(s"assert.deepStrictEqual($actStr, $expStr);")
      case _ =>
        out.puts(s"assert.strictEqual($actStr, $expStr);")
    }
  }

  override def floatEquality(check: TestEquals): Unit = {
    val actStr = translateAct(check.actual)
    val expStr = translator.translate(check.expected)
    out.puts(s"assert(Math.abs($actStr - $expStr) < $FLOAT_DELTA);")
  }

  override def nullAssert(actual: Ast.expr): Unit = {
    val actStr = translateAct(actual)
    out.puts(s"assert.strictEqual($actStr, undefined);")
  }

  override def trueArrayEquality(check: TestEquals, elType: DataType, elts: Seq[Ast.expr]): Unit = {
    val actStr = translateAct(check.actual)
    val expStr = translator.translate(check.expected)
    out.puts(s"assert.deepStrictEqual($actStr, $expStr);")
  }

  override def testException(actual: Ast.expr, exception: KSError): Unit = {
    out.puts("assert.throws(")
    out.inc
    out.puts("() => {")
    out.inc
    out.puts(translateAct(actual) + ";")
    out.dec
    out.puts("},")
    out.puts(s"{ name: '${JavaScriptCompiler.ksErrorName(exception)}' }")
    out.dec
    out.puts(")")
  }

  override def indentStr: String = "  "

  override def results: String = {
    "// " + AUTOGEN_COMMENT + "\n\n" +
      importList.toList.mkString("", "\n", "\n") + "\n" +
      out.result
  }

  def translateAct(x: Ast.expr): String =
    translator.translate(x).replace(s"this.${Main.INIT_OBJ_NAME}", "r")
}

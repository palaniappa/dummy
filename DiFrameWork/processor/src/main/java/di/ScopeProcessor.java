package di;

import com.squareup.javapoet.JavaFile;
import com.squareup.javapoet.TypeSpec;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.RoundEnvironment;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.TypeElement;
import javax.lang.model.util.ElementFilter;
import java.util.Collections;
import java.util.Set;

public class ScopeProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        System.out.println("Processor is working dude!");
        TypeElement scopeAnnotation = processingEnv.getElementUtils().getTypeElement("di.Scope");
        ElementFilter.typesIn(roundEnv.getElementsAnnotatedWith(scopeAnnotation)).forEach(scope ->{
            JavaFile javaFile = createScoeImpl(scope);
            try {
                javaFile.writeTo(processingEnv.getFiler());
            }
            catch (Exception e){
                e.printStackTrace();
            }
        });
        return true;
    }

    private JavaFile createScoeImpl(TypeElement scope) {
        String packageName = processingEnv.getElementUtils().getPackageOf(scope).toString();
        String className = scope.getSimpleName() + "Impl";
        return JavaFile.builder(packageName
                , TypeSpec.classBuilder(className).build())
                .build();
    }

    @Override
    public Set<String> getSupportedAnnotationTypes() {
        return Collections.singleton("di.Scope");
    }

    @Override
    public SourceVersion getSupportedSourceVersion() {
        return SourceVersion.latestSupported();
    }
}

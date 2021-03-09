import os
import docx
import json

def readDocx(filename):
    doc = docx.Document(filename)
    fullText = []
    for p in doc.paragraphs:
        fullText.append(p.text)
    return '\n'.join(fullText)

def extractQuestions(text, arabic = False, init = {}):
    if arabic:
        sep = '؟' + "\n"
    else:
        sep = '?' + "\n"
    l = text.split(sep)
    ret = [1] * (len(l)-1)
    for indx, val in enumerate(l):
        aq = val.rsplit("\n", 1)
        if indx < len(l) -1:
            ret[indx] = init.copy()
        if indx > 0: # then it sure contains an answer
            #Get the answer
            if len(aq) < 1:
                continue
            ret[indx-1]['answer'] = aq[0]
        if indx < len(l) -1: # then it sure contains a question
            #Get the question
            if len(aq) < 2:
                print(aq)
                continue
            ret[indx]['question'] = aq[1] + sep
    return ret

deps = os.listdir('.')
results = []
for department in deps:
    if os.path.isdir(department):
        languages = os.listdir(department)
        for language in languages:
            treatments = os.listdir(department + '/' + language)
            for treatment in treatments:
                print (department, " >> ", language, " >> ", treatment)
                if treatment.startswith('~') or not treatment.endswith('docx'):
                    continue
                docText = readDocx(department + '/' + language + '/' + treatment)
                FAQ = extractQuestions(docText, language == 'Arabic',
                    {
                        'department' : department,
                        'lang' : language,
                        'treatment' : treatment.rsplit('.')[0]
                    }
                )
                results.extend(FAQ)
with open('FAQ.json', 'w') as out:
    json.dump(results, out)
print('Done', len(results))
print(len(results), ' FAQs retrived');

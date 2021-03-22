import os
import docx

def readDocx(filename):
    doc = docx.Document(filename)
    fullText = []
    for p in doc.paragraphs:
        fullText.append(p.text)
    return '\n'.join(fullText)

def extractQuestions(text, arabic = False):
    if arabic:
        sep = '؟' + "\n"
    else:
        sep = '?' + "\n"
    l = text.split(sep)
    ret = [None] * (len(l)-1)
    for indx, val in enumerate(l):
        print("indx: ", indx)
        aq = val.rsplit("\n", 1)
        ret[indx] = {}
        if len(aq) < 2:
            print(aq)
        if indx > 0: # then it sure contains an answer
            #Get the answer
            if len(aq) < 1:
                continue
            print("Current A: ", aq[0])
            ret[indx-1]['answer'] = aq[0]
        if indx < len(l) -1: # then it sure contains a question
            #Get the question
            if len(aq) < 2:
                continue
            print('Current Q: ', aq[1] + sep)
            ret[indx]['question'] = aq[1] + sep
    return ret

txt = readDocx('Face Thread lifting.docx')
qs = extractQuestions(txt, True)
#for q in qs:
    #print("Question: ", q['question'])
    #print("Answer: ", q['answer'])

import re
with open("src/components/ContactForm.tsx", "r") as f:
    content = f.read()
print(repr(re.findall(r'const text = `.*?`;', content, re.DOTALL)))

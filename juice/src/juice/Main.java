package juice;

import java.io.*;
import java.util.*;

public class Main {

    public static void main(String [] args) throws IOException {
        new Main().doIt();
    }

    private void doIt () throws IOException {
        Elements elements = new Elements();
        input (elements, "juice.in");
        output1(elements, "juice1.out");
        output2(elements, "juice2.out");
        sort(elements);
        output3("juice3.out", minMove(elements));
        Collections.sort(elements.getList(), new ComponentComparator());
    }

    private void sort(Elements elements) {
        Sort s = new Sort(elements.getList());
        s.run();
        elements.setList(s.getList());
    }
    private void addProd (Elements elem, String str) {
        StringTokenizer st = new StringTokenizer(str);
        String s;

        while (st.hasMoreTokens()) {
            s = st.nextToken();
            if (elem.getProducts().add(s))
                elem.getNormalProducts().add(s);
        }
    }

    private void input(Elements elem, String source) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader (source));
        String str = br.readLine();
        Juice j;

        while (str != null) {
            j = new Juice(str);
            elem.getList().add(j);
            addProd(elem, str);
            str = br.readLine();
        }
    }

    private void output1 (Elements elem, String des) throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter(des));

        for (String s: elem.getNormalProducts()) {
            pw.println(s);
        }

        pw.flush();
    }

    private void output2 (Elements elem, String des) throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter(des));

        for (String s: elem.getProducts()) {
            pw.println(s);
        }

        pw.flush();
    }

    private void output3 (String des, int a) throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter(des));

        pw.print(a);
        pw.flush();
    }

    private int minMove (Elements elements) {
        ArrayList <Juice> q = new ArrayList<Juice>();
        ArrayList <Boolean> flags = new ArrayList<Boolean>(elements.getList().size());
        int size = 0;

        for (int i = 0; i < elements.getList().size(); i++)
            flags.add(false);

        int num = 0;

        while (q.isEmpty()) {
            size++;
            while (elements.getList().get(num).getComponents().size() == size) {
                q.add(elements.getList().get(num));
                flags.set(num, true);
                num++;
            }
        }

        size = elements.getList().size();
        int count = 0;
        Juice juice;
        boolean flag;
        int elem = 0;

        while (elem < size) {
            juice = q.get(elem++);
            flag = false;
            for (int i = num; i < size; i++)
                if (!flags.get(i) && contains(juice, elements.getList().get(i))) {
                    q.add(elements.getList().get(i));
                    flags.set(i, true);
                    flag = true;
                }

            if (!flag) {
                for (int i = 0; i < elem - 1; i++)
                    if (contains(juice, q.get(i))) {
                        flag = true;
                        break;
                    }
                if (!flag)
                    count++;
            }

            /*если какие-то соки не добавились (уникальные продукты)*/

            if (elem == q.size() && elem < size) {
                int i = num;
                int size_ = -1;
                flag = true;
                while (flag){
                    if (!flags.get(i)) {
                        size_ = elements.getList().get(i).getComponents().size();
                        q.add(elements.getList().get(i));
                        flags.set(i,true);
                        flag = false;
                    }
                    else
                        i++;
                }
                i++;
                while (i < elements.getList().size() && elements.getList().get(i).getComponents().size() == size_) {
                    q.add(elements.getList().get(i++));
                    flags.set(i, true);
                }
            }
        }

        return count;
    }

    private boolean contains (Juice what, Juice where) {
        if (what.getComponents().size() > where.getComponents().size())
            return false;

        for (String s: what.getComponents()) {
            if (!where.getComponents().contains(s))
                return false;
        }

        return true;
    }
}

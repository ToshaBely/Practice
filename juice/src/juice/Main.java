package juice;

import java.io.*;
import java.util.*;

public class Main implements Runnable{

    private TreeSet <String> products;
    private ArrayList <String> normalProducts;
    private ArrayList <Juice> list;


    public static void main(String [] args) throws IOException{
        new Main().doIt();
    }

    public void run() {
        Collections.sort(list, new ComponentComparator());
    }

    void doIt () throws IOException{
        normalProducts = new ArrayList<String>();
        products = new TreeSet<String>();
        list = new ArrayList<Juice>();

        input ("juice.in");
        output1("juice1.out");
        output2("juice2.out");
      //  Collections.sort(list, new ComponentComparator());
        new Thread(this).start();
        output3("juice3.out", minMove());
    }

    void addProd (String str) {
        StringTokenizer st = new StringTokenizer(str);
        String s;

        while (st.hasMoreTokens()){
            s = st.nextToken();
            if (products.add(s))
                normalProducts.add(s);
        }
    }

    void input(String source) throws IOException{
        BufferedReader br = new BufferedReader(new FileReader (source));
        String str = br.readLine();
        Juice j;

        while (str != null){
            j = new Juice();
            j.inputComponents(str);
            list.add(j);
            addProd(str);
            str = br.readLine();
        }
    }

    void output1 (String des) throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter(des));

        for (String s: normalProducts){
            pw.println(s);
        }

        pw.flush();
    }

    void output2 (String des) throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter(des));

        for (String s: products){
            pw.println(s);
        }

        pw.flush();
    }

    void output3 (String des, int a) throws IOException {
        PrintWriter pw = new PrintWriter(new FileWriter(des));

        pw.print(a);
        pw.flush();
    }

    int minMove () {
        ArrayList <Juice> q = new ArrayList<Juice>();
        ArrayList <Boolean> flags = new ArrayList<Boolean>(list.size());
        int size = 0;

        for (int i = 0; i < list.size(); i++)
            flags.add(false);

        int num = 0;

        while (q.isEmpty()) {
            size++;
            while (list.get(num).getComponents().size() == size) {
                q.add(list.get(num));
                flags.set(num, true);
                num++;
            }
        }

        size = list.size();
        int count = 0;
        Juice juice;
        boolean flag;
        int elem = 0;

        while (elem < size) {
            juice = q.get(elem++);
            flag = false;
            for (int i = num; i < size; i++)
                if (!flags.get(i) && contains(juice, list.get(i))) {
                    q.add(list.get(i));
                    flags.set(i, true);
                    flag = true;
                }

            if (!flag){
                for (int i = 0; i < elem - 1; i++)
                    if (contains(juice, q.get(i))) {
                        flag = true;
                        break;
                    }
                if (!flag)
                    count++;
            }

            /*если какие-то соки не добавились (уникальные продукты)*/

            if (elem == q.size() && elem < size){
                int i = num;
                int size_ = -1;
                flag = true;
                while (flag){
                    if (!flags.get(i)){
                        size_ = list.get(i).getComponents().size();
                        q.add(list.get(i));
                        flags.set(i,true);
                        flag = false;
                    }
                    else
                        i++;
                }
                i++;
                while (i < list.size() && list.get(i).getComponents().size() == size_){
                    q.add(list.get(i++));
                    flags.set(i, true);
                }
            }
        }

        return count;
    }

    boolean contains (Juice what, Juice where){
        if (what.getComponents().size() > where.getComponents().size())
            return false;

        for (String s: what.getComponents()){
            if (!where.getComponents().contains(s))
                return false;
        }

        return true;
    }
}
